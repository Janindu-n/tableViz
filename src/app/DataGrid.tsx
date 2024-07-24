//@ts-nocheck
// "use client"
// import React, { useEffect, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import axios from 'axios';

// const DataGrid = ({ dataset }) => {
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [rowCount, setRowCount] = useState(0);

//   const generateColumnDefs = (features) => {
//     return features.map((feature) => ({
//       headerName: feature.name,
//       field: feature.name,
//       sortable: true,
//       filter: true,
//       resizable: true,
//     }));
//   };

//   const fetchAllData = async () => {
//     let allRows = [];
//     let currentPage = 0;
//     const pageSize = 100;
//     let totalRows = 0;

//     try {
//       // first page to get the total number of rows
//       const response = await axios.get(
//         `https://datasets-server.huggingface.co/rows?dataset=${dataset}&config=default&split=train&offset=${currentPage * pageSize}&length=${pageSize}`
//       );
//       totalRows = response.data.num_rows_total;
//       allRows = allRows.concat(response.data.rows.map((item) => item.row));

//       // remaining pages
//       while (allRows.length < totalRows) {
//         currentPage++;
//         const response = await axios.get(
//           `https://datasets-server.huggingface.co/rows?dataset=${dataset}&config=default&split=train&offset=${currentPage * pageSize}&length=${pageSize}`
//         );
//         allRows = allRows.concat(response.data.rows.map((item) => item.row));
//       }

//       setRowData(allRows);
//       setRowCount(totalRows);
//       const columns = generateColumnDefs(response.data.features);
//       setColumnDefs(columns);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, [dataset]);

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <p>Total number of rows: {rowCount}</p>
//       <div className="ag-theme-quartz-dark" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           defaultColDef={{ sortable: true, filter: true, resizable: true }}
//           pagination={true}
//           paginationPageSize={100}
//         />
//       </div>
//     </div>
//   );
// };

// export default DataGrid;
// pages/index.tsx
import { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sqlQuery: query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok:', response);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data.result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Execute SQL Query</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default Home;
