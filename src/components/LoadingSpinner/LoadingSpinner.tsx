import { CircularProgress, Box, Typography } from '@mui/material';
import s from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = 'Завантаження...' }: LoadingSpinnerProps) => {
  return (
    <div className={s.container}>
      <Box className={s.spinnerContainer}>
        <CircularProgress size={60} className={s.spinner} />
        <Typography variant="body1" className={s.message}>
          {message}
        </Typography>
      </Box>
    </div>
  );
};

