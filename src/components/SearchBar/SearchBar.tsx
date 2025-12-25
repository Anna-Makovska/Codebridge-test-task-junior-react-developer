import { TextField } from '@mui/material';
import s from './SearchBar.module.css';

export const SearchBar = () => {
  return (
    <div className={s.searchContainer}>
      <TextField
        placeholder="The most successful IT companies in 2020"
        variant="outlined"
        fullWidth
        className={s.searchField}
      />
    </div>
  );
};