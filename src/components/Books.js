import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
} from '@mui/material';

import { apiRequest } from '../services/api';

import { useNavigate } from "react-router-dom"
import {
    ToastContainer,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from './Toast';
import DataTable from './common/DataTable';
import Loader from './common/Loader';

function Books() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [books, setBooks] = useState([]);
    const [showData, setShowData] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        coverPageUrl: null, // Store the file here
        publisher: '',
        mrpPrice: '',
        medium: '',
        author: '',
        samplePdfUrl: null, // Store the file here
        size: '',
        pages: '',
        deepLink: '',
        metaData: '',
        count: 0,
        edition: 0,
        isbn: '',
        videoUrl: ''
    });
    
    const [selectedBook, setSelectedBook] = useState(null);
    // window.location.reload();

    useEffect(() => {
        async function fetchBooks() {
            try {
                const token = window.localStorage.getItem('token');
                setLoading(true);
                const bookResponse = await fetch('http://139.59.46.40:8000/api/book', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}` // Use 'Bearer' for token-based authentication
                    }
                });

                if (bookResponse.status === 200) {
                    const data = await bookResponse.json();
                    setBooks([...data?.data?.rows]);
                }
                const catResponse = await fetch('http://139.59.46.40:8000/api/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}` // Use 'Bearer' for token-based authentication
                    }
                });

                if (catResponse.status === 200) {
                    const data = await catResponse.json();
                    setCategories([...data?.data?.rows]);
                }
                const publisherResponse = await fetch('http://139.59.46.40:8000/api/publisher', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}` // Use 'Bearer' for token-based authentication
                    }
                });

                if (publisherResponse.status === 200) {
                    const data = await publisherResponse.json();
                    setPublishers([...data?.data?.rows]);
                }
                setLoading(false);
            } catch (error) {
                // Handle fetch or other errors
            }
        }

        fetchBooks(); // Call the function to fetch books
    }, []);
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // If the input is a file input, store the selected file
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddBook = async (dataToSend) => {
        const response = await apiRequest('api/book', 'POST', null, dataToSend);

        return response;
    };

    const handleEditBook = async (dataToSend) => {
        const response = await apiRequest('api/book', 'PUT', null, dataToSend);

        return response;
    };
    const handleEdit = (book) => {
        // Set selected book for editing
        setSelectedBook(book);
        setShowData(false); // Show the edit form
        setFormData(book); // Pre-fill the form with book details
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // Check if selectedBook is not null to determine if it's an edit or add operation
        if (selectedBook) {
            formDataToSend.append('id', selectedBook.id); // Include book ID for editing
            const response = await handleEditBook(formDataToSend);

            if (response?.success) {
                showSuccessToast('Book updated successfully!');
            } else {
                showErrorToast(response.message);
            }
        } else {
            const response = await handleAddBook(formDataToSend);

            if (response?.success) {
                showSuccessToast('Book added successfully!');
            } else {
                showErrorToast(response.message);
            }
        }

        setSelectedBook(null);
        setShowData(true);
    };

    const headers = ['Title', 'Category', 'Publisher', 'Author', 'MrpPrice',  'Medium'];
    const actions = [
        {
            label: 'Edit',
                handler: handleEdit
                // Handle edit action
            
        },
        {
            label: 'Delete',
            handler: item => {
                // Handle delete action
            },
        },
    ];
    return (
        <Container>
            <ToastContainer />
            {loading &&
                <Loader />}
      
            {showData && < div style={{paddingBottom:"2rem"}}>
             <Button variant="contained" sx={{float:'right'}} onClick={()=>{setShowData(false)}}>Add New</Button>
             </div>
             }
            {!showData &&
                <><Typography variant="h5">Add a New Book</Typography><form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* <img src="https://bookbo.blr1.digitaloceanspaces.com/1697735559939__1697735419667__PNG_Logo.png" alt="Girl in a jacket" width="500" height="600" /> */}
                            <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                fullWidth
                                required />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {categories?.map((cat, i) => {
                                        return (<MenuItem value={cat.id} key={i}>{cat.title}</MenuItem>);
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Publisher</InputLabel>
                                <Select
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                >
                                    {publishers?.map((pub, i) => {
                                        return (<MenuItem value={pub.id} key={i}>{pub.name}</MenuItem>);
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="MRP Price"
                                name="mrpPrice"
                                value={formData.mrpPrice}
                                onChange={handleChange}
                                fullWidth
                                required />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Medium</InputLabel>
                                <Select
                                    name="medium"
                                    value={formData.medium}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="telugu">Telugu</MenuItem>
                                    <MenuItem value="english">English</MenuItem>
                                    {/* Add more medium options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="ISBN No"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Size"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Pages"
                                name="pages"
                                value={formData.pages}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Meta Data"
                                name="metaData"
                                value={formData.metaData}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Deep Link"
                                name="deepLink"
                                value={formData.deepLink}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Count"
                                name="count"
                                type="number"
                                value={formData.count}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Edition"
                                name="edition"
                                type="number"
                                value={formData.edition}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography> Cover Page </Typography>
                            <Input
                                type="file"
                                name="coverPageUrl"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography> Cover Page </Typography>
                            <Input
                                type="file"
                                name="samplePdfUrl"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Video Url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                            &nbsp; &nbsp; &nbsp;
                            <Button variant="outlined" onClick={()=> setShowData(true)} color="primary" type="cancel">
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form></>
            }
            {showData && <DataTable data={books} headers={headers} actions={actions} />}
        </Container>
    );
}

export default Books;
