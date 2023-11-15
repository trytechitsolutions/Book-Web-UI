import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextareaAutosize,
    Radio,
    RadioGroup,
    FormControlLabel,
    IconButton,
    Container,
    Dialog, DialogTitle, DialogContent, DialogActions, FormLabel, Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Loader from './common/Loader';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    fileInput: {
        backgroundColor: '#f5f5f5', 
        padding: '20px 12px',
        borderRadius: '5px',
        width: '98%',
    },
}));

const StoreDetailsForm = () => {
    const classes = useStyles();
    const [isShopTimingsModalOpen, setShopTimingsModalOpen] = useState(false);

    const openShopTimingsModal = () => {
        setShopTimingsModalOpen(true);
    };

    const closeShopTimingsModal = () => {
        setShopTimingsModalOpen(false);
    };
    const [formData, setFormData] = useState({
        storeLogo: null,
        storeFavicon: null,
        storeAddress: '',
        pincode: '',
        contactNumber: '',
        contactEmail: '',
        whatsappNumber: '',
        warehouses: [{ name: '', pincode: '', warehouseAddress: '' }],
        storeTimings: { days: '', am: '', pm: '' },
        socialProfiles: '',
        policies: '',
        guestCheckOut: 'on',
    });

    const [loading, setLoading] = useState(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddWarehouse = () => {
        setFormData({
            ...formData,
            warehouses: [...formData.warehouses, { name: '', pincode: '', warehouseAddress: '' }],
        });
    };

    const [selectedDay, setSelectedDay] = useState('');
    const [selectedAM, setSelectedAM] = useState('');
    const [selectedPM, setSelectedPM] = useState('');

    const days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ];

    const hours = [
        '12 AM',
        '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
        '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
    ];

    return (
        <Container maxWidth="lg">
            {loading &&
                <Loader />}
            <Typography variant="h4" align="center" gutterBottom>
                Store Details Form
            </Typography>
            &nbsp;&nbsp;
            <form>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}>
                        <Typography variant="h6">STORE DETAILS</Typography>
                    </Grid> */}
                    <Grid item xs={6}>
                        <InputLabel >Store LOGO:</InputLabel>
                        <input type="file" accept=".jpg, .jpeg, .png" name="storeLogo" onChange={handleInputChange} className={classes.fileInput} />&nbsp;&nbsp;

                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel >Store FavIcon:</InputLabel>
                        <input type="file" accept=".ico" name="storeFavicon" onChange={handleInputChange} className={classes.fileInput} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextareaAutosize
                            minRows={4}
                            maxRows={6}
                            placeholder="Store Address"
                            name="storeAddress"
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            name="contactNumber"
                            onChange={handleInputChange}
                        /></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Contact Email"
                            name="contactEmail"
                            type="email"
                            onChange={handleInputChange}
                        /></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="WhatsApp Number"
                            name="whatsappNumber"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {formData.warehouses.map((warehouse, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        label="Warehouse Name"
                                        name={`name${index}`}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        label="Warehouse Pincode"
                                        name={`pincode${index}`}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextareaAutosize
                                        minRows={3}
                                        maxRows={6}
                                        placeholder="Add Warehouse"
                                        name={`warehouseAddress${index}`}
                                        onChange={handleInputChange}
                                        style={{ width: '100%' }}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <IconButton onClick={handleAddWarehouse}>
                            <AddIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Button variant="contained" color="primary" onClick={openShopTimingsModal}>
                                Shop Timings
                            </Button>
                        </div>
                    </Grid>
                    <Dialog open={isShopTimingsModalOpen} onClose={closeShopTimingsModal} fullWidth>
                        <DialogTitle>Shop Timings</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2} style={{ marginTop: 5 }}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Day"
                                            value={selectedDay}
                                            onChange={(e) => setSelectedDay(e.target.value)}
                                        >
                                            {days.map((day) => (
                                                <MenuItem key={day} value={day}>
                                                    {day}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Start Time</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Start Time"
                                            value={selectedAM}
                                            onChange={(e) => setSelectedAM(e.target.value)}
                                        >
                                            {hours.map((hour) => (
                                                <MenuItem key={hour} value={hour}>
                                                    {hour}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">End Time</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="End Time"
                                            value={selectedPM}
                                            onChange={(e) => setSelectedPM(e.target.value)}
                                        >
                                            {hours.map((hour) => (
                                                <MenuItem key={hour} value={hour}>
                                                    {hour}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                &nbsp;
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} align="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Timings Applicable for Below Days</FormLabel>
                                        {days.map((day) => (
                                            <FormControlLabel
                                                key={day}
                                                control={<Checkbox />}
                                                label={day}
                                            />
                                        ))}
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12}>
                                   
                                </Grid> */}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeShopTimingsModal} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Social Profiles"
                            name="socialProfiles"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            minRows={10}
                            maxRows={10}
                            placeholder="Policies"
                            name="policies"
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel>Guest Check-Out</FormLabel>
                            <RadioGroup name="guestCheckOut" value={formData.guestCheckOut || "off"} onChange={handleInputChange} row>
                                <FormControlLabel value="on" control={<Radio />} label="On" />
                                <FormControlLabel value="off" control={<Radio />} label="Off" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default StoreDetailsForm;
