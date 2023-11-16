import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, IconButton, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const GenericTable = ({ data, columns, onEdit, onDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    const handleDelete = (id) => {
        setSelectedItemId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        onDelete(selectedItemId);
        setDeleteDialogOpen(false);
    };

    const cancelDelete = () => {
        setSelectedItemId(null);
        setDeleteDialogOpen(false);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{typeof row[column.id] === 'boolean'
                                        ? row[column.id] ? 'Active' : 'Inactive'
                                        : row[column.id]}</TableCell>
                                ))}
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete}>Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GenericTable;
