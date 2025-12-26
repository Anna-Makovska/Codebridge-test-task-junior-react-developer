import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '../../components/Button/Button';
import HomeIcon from '../../icons/Arrow - Left.svg';
import s from './NotFound.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
  palette: {
    primary: {
      main: "#363636",
    },
  },
});

export function NotFound() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.container}>
        <div className={s.iconContainer}>
          <Button to="/" icon={HomeIcon} iconPosition="left">
            Home page
          </Button>
        </div>
        <div className={s.content}>
          <Typography variant="h1" className={s.errorCode}>
            404
          </Typography>
          <Typography variant="h4" className={s.title}>
            Сторінку не знайдено
          </Typography>
          <Typography variant="body1" className={s.message}>
            Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}

