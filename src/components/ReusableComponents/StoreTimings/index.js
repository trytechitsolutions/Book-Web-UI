import React, { useEffect, useState } from 'react';
import { Typography, Switch, TextField, Grid, Paper } from '@mui/material';

const StoreTimingsConfigurator = ({onChangeAction}) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [timings, setTimings] = useState({
    Monday: { isOpen: false, startTime: '', endTime: '' },
    Tuesday: { isOpen: false, startTime: '', endTime: '' },
    Wednesday: { isOpen: false, startTime: '', endTime: '' },
    Thursday: { isOpen: false, startTime: '', endTime: '' },
    Friday: { isOpen: false, startTime: '', endTime: '' },
    Saturday: { isOpen: false, startTime: '', endTime: '' },
    Sunday: { isOpen: false, startTime: '', endTime: '' },
  });
useEffect(()=>{
    onChangeAction(timings)
}, [timings])
  const handleSwitchChange = (day) => {
    setTimings((prevTimings) => ({
      ...prevTimings,
      [day]: {
        ...prevTimings[day],
        isOpen: !prevTimings[day].isOpen,
      },
    }));
  };

  const handleTimeChange = (day, type) => (e) => {
    setTimings((prevTimings) => ({
      ...prevTimings,
      [day]: {
        ...prevTimings[day],
        [type]: e.target.value,
      },
    }));
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Store Timings Configuration
      </Typography>
      {daysOfWeek.map((day) => (
        <Grid container sx={{marginBottom:'2rem'}}alignItems="center" key={day}>
          <Grid item xs={4}>
            <Typography>{day}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={timings[day].isOpen}
              onChange={() => handleSwitchChange(day)}
              color="primary"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Time"
              type="time"
              value={timings[day].startTime}
              onChange={handleTimeChange(day, 'startTime')}
              disabled={!timings[day].isOpen}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Time"
              type="time"
              value={timings[day].endTime}
              onChange={handleTimeChange(day, 'endTime')}
              disabled={!timings[day].isOpen}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default StoreTimingsConfigurator;
