import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const Tags = [
  '파티',
  '경쟁',
  '레이드',
  'FPS',
  '듀오',
  'AOS',
  'RPG',
  '딜러',
  '힐러',
  '탱커',
  '서폿',
];

export default function SelectInput() {
  const [tagList, setTagList] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setTagList(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <InputLabel id="name" />
      <Select
        labelId="name"
        id="name"
        multiple
        value={tagList}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="name" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {Tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
