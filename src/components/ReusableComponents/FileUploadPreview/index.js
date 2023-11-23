import React, { useState } from 'react';
import { Button, Grid, Typography, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    previewContainer: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
    },
    previewImage: {
        maxWidth: '100%',
        maxHeight: '100px', // Set the maximum height as per your requirement
        margin: 8,
    },
    removeButton: {
        marginLeft: 8,
    },
}));

const FileUploadPreview = ({ label, onFileChange, previewUrl }) => {
    const classes = useStyles();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            onFileChange(selectedFile);
        }
    };

    const handleRemove = () => {
        setFile(null);
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
                <Typography>{label}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ marginBottom: "2rem" }}>
                {!file && (<><Input
                    type="file"
                    inputProps={{ accept: 'image/*, application/pdf' }}
                    style={{ display: 'none' }}
                    id={`file-upload-${label.toLowerCase().replace(/\s/g, '-')}`}
                    onChange={handleFileChange} /><label htmlFor={`file-upload-${label.toLowerCase().replace(/\s/g, '-')}`}>
                        <Button component="span" variant="outlined">
                            Upload {label}
                        </Button>
                    </label></>)
                }
                {file && (
                    <div className={classes.previewContainer}>
                        <Typography variant="body2">{file.name}</Typography>
                        {file.type.startsWith('image/') && (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className={classes.previewImage}
                            />
                        )}
                        {/* Add handling for other file types here */}
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.removeButton}
                            onClick={handleRemove}
                        >
                            Remove
                        </Button>
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

export default FileUploadPreview;
