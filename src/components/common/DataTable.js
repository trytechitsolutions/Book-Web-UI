import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const DataTable = ({ data, headers, actions, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = itemsPerPage || 10;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function toCamelCase(str) {
    // Convert the first character to lowercase
    const firstChar = str.charAt(0).toLowerCase();
    // Combine it with the rest of the string
    const restOfString = str.slice(1);
    return firstChar + restOfString;
  }

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Table style={{ paddingTop: '5%' }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={header}>{item[toCamelCase(header)]}</td>
              ))}
              {actions && (
                <td>
                  {actions.map((action) => (
                    <span
                      key={action.label}
                      onClick={() => action.handler(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      {action.label === 'Edit' ? <EditIcon /> : <DeleteIcon />}
                    </span>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
