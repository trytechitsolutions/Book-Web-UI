import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable from './common/DataTable';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const token = window.localStorage.getItem('token');
        const response = await fetch('http://139.59.46.40:8000/api/book', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Use 'Bearer' for token-based authentication
          }
        });

        if (response.status === 200) {
          const data = await response.json(); // Parse JSON response
          setBooks(data?.data?.rows); // Update state with fetched data
        } else {
          // Handle non-200 status codes here
        }
      } catch (error) {
        // Handle fetch or other errors
      }
    }

    fetchBooks(); // Call the function to fetch books
  }, []); // Empty dependency array means it runs once on mount
  const headers = ['Title', 'Category', 'Publisher', 'Author', 'Price', 'Medium'];
  const actions = [
    {
      label: 'Edit',
      handler: item => {
        // Handle edit action
      },
    },
    {
      label: 'Delete',
      handler: item => {
        // Handle delete action
      },
    },
  ];

  return (
    <div style={{paddingLeft:"10%", paddingRigt:"10%"}}>
      <h2>Book List</h2>
      <DataTable data ={books}  headers={headers} actions={actions } />
      {/* <Table style={{paddingTop:"5%"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Publisher</th>
            <th>Author</th>
            <th>Price</th>
            <th>Medium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.category}</td>
              <td>{book.publisher}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.medium}</td>
              <th></th>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default BookList;
