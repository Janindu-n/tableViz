//@ts-nocheck
"use client"
// src/app/DataGrid.tsx
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import axios from 'axios';

const DataGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const generateColumnDefs = (features) => {
    return features.map(feature => ({
      headerName: feature.name,
      field: feature.name,
      sortable: true,
      filter: true,
      resizable: true
    }));
  };

  const fetchAllData = async () => {
    let allRows = [];
    let currentPage = 0;
    const pageSize = 100;
    let totalRows = 0;

    try {
      //first page to get the total num of rows
      const response = await axios.get(`https://datasets-server.huggingface.co/rows?dataset=allenai%2Fopenbookqa&config=additional&split=train&limit=${pageSize}&offset=${currentPage * pageSize}`);
      totalRows = response.data.num_rows_total;
      allRows = allRows.concat(response.data.rows.map(item => item.row));

      // remaining pages
      while (allRows.length < totalRows) {
        currentPage++;
        const response = await axios.get(`https://datasets-server.huggingface.co/rows?dataset=allenai%2Fopenbookqa&config=additional&split=train&limit=${pageSize}&offset=${currentPage * pageSize}`);
        allRows = allRows.concat(response.data.rows.map(item => item.row));
      }

      setRowData(allRows);
      setRowCount(totalRows);
      const columns = generateColumnDefs(response.data.features);
      setColumnDefs(columns);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      
      <p>Total number of rows: {rowCount}</p>
      <div className="ag-theme-quartz-dark" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          pagination={true}
          paginationPageSize={100}
        />
      </div>
    </div>
  );
};

export default DataGrid;
