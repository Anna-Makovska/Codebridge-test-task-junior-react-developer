import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import s from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ 
  title = 'Помилка',
  message = 'Щось пішло не так. Будь ласка, спробуйте ще раз.',
  onRetry 
}: ErrorMessageProps) => {
  return (
    <div className={s.container}>
      <Alert 
        severity="error" 
        icon={<FiAlertCircle className={s.icon} />}
        className={s.alert}
      >
        <AlertTitle className={s.title}>{title}</AlertTitle>
        <Box className={s.content}>
          <p className={s.message}>{message}</p>
          {onRetry && (
            <Button
              variant="contained"
              startIcon={<FiRefreshCw />}
              onClick={onRetry}
              className={s.retryButton}
            >
              Спробувати ще раз
            </Button>
          )}
        </Box>
      </Alert>
    </div>
  );
};

