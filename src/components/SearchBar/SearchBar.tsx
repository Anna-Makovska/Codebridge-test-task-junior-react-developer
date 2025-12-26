import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { useDebounce } from 'use-debounce';
import SearchIcon from '../../icons/Vector.svg';
import s from './SearchBar.module.scss';

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

export const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className={s.searchContainer}>
      <TextField
        placeholder="The most successful IT companies in 2020"
        variant="outlined"
        fullWidth
        className={s.searchField}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          
          '& .MuiInputLabel-root': {
            fontFamily: "'Montserrat', sans-serif",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ padding: '20px' }}>
              <img src={SearchIcon} alt="search" width="20" height="20" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};