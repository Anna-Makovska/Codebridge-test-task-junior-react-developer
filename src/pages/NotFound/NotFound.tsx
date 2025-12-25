import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { FiHome, FiSearch } from 'react-icons/fi';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import s from './NotFound.module.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export function NotFound() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.container}>
        <Container maxWidth="md">
          <Box className={s.content}>
            <Typography variant="h1" className={s.errorCode}>
              404
            </Typography>
            <Typography variant="h4" className={s.title}>
              Сторінку не знайдено
            </Typography>
            <Typography variant="body1" className={s.message}>
              Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
            </Typography>
            <Box className={s.buttons}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/"
                startIcon={<FiHome />}
                className={s.button}
              >
                На головну
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/"
                startIcon={<FiSearch />}
                className={s.button}
              >
                Пошук статей
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

