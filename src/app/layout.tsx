//@ts-nocheck
"use client"
// src/app/layout.tsx
import React, { useState } from 'react';
import './globals.css';
import DataGrid from './DataGrid';

const Layout = ({ children }) => {
  const [selectedDataset, setSelectedDataset] = useState('allenai/openbookqa');
  const [selectedTableName, setSelectedTableName] = useState('Table 1');

  const handleDatasetChange = (dataset, tableName) => {
    setSelectedDataset(dataset);
    setSelectedTableName(tableName);
  };

  return (
    <html lang="en">
      <head>
        <title>City Graph DataViz</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="layout">
          <aside className="side-panel">
            <nav>
              <ul>
                <li>
                  <button onClick={() => handleDatasetChange('allenai/openbookqa', 'Table 1')}>Table 1</button>
                </li>
                <li>
                  <button onClick={() => handleDatasetChange('nvidia/HelpSteer2', 'Table 2')}>Table 2</button>
                </li>
                <li>
                  <button onClick={() => handleDatasetChange('m-a-p/COIG-CQIA', 'Table 3')}>Table 3</button>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="main-content">
            <h1>City Graph DataViz - {selectedTableName}</h1>
            <DataGrid dataset={selectedDataset} />
          </main>
        </div>
        {children}
      </body>
    </html>
  );
};

export default Layout;
