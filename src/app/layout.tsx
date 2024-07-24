//@ts-nocheck
"use client"
import React, { useState } from 'react';
import './globals.css';
import DataGrid from './DataGrid';

const Layout = ({ children }) => {
  const [dataset, setDataset] = useState('nvidia/HelpSteer2');
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    setDataset(inputValue);
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
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search dataset"
              />
              <button type="submit">Search</button>
            </form>
          </aside>
          <main className="main-content">
            <h1>City Graph DataViz - {dataset}</h1>
            <DataGrid dataset={dataset} />
          </main>
        </div>
        
      </body>
    </html>
  );
};

export default Layout;
