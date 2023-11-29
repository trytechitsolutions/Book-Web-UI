import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const MultiWordInput = () => {
  const [inputValue, setInputValue] = useState('adjhfsahlfblasfhsldf');
  const [selectedWords, setSelectedWords] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setSelectedWords((prevWords) => [...prevWords, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (wordToDelete) => {
    setSelectedWords((prevWords) =>
      prevWords.filter((word) => word !== wordToDelete)
    );
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        value={inputValue}
        onChange={(event, newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter Words"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <div style={{ marginTop: 10 }}>
        {selectedWords.map((word, index) => (
          <Chip
            key={index}
            label={word}
            onDelete={() => handleDelete(word)}
            style={{ margin: 4 }}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiWordInput;
