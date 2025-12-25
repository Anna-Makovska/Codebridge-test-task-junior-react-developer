import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import s from './SearchBar.module.css';

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
      />
    </div>
  );
};