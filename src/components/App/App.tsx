import { SearchBar } from '../SearchBar/SearchBar'
import { ArticleList } from '../ArticleList/ArticleList'
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '../../services/fetchArticles';
import { Typography, Divider, CircularProgress, Alert, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import s from './App.module.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.app}>
        <header className={s.header}>
          <SearchBar />
        </header>
        <Container maxWidth="xl" className={s.main}>
          <div className={s.resultsHeader}>
            <Typography variant="h6" className={s.resultsText}>
              Results: {data?.length || 0}
            </Typography>
            <Divider className={s.divider} />
          </div>
          
          {isLoading && (
            <div className={s.loadingContainer}>
              <CircularProgress />
            </div>
          )}
          
          {isError && (
            <Alert severity="error" className={s.errorAlert}>
              Помилка завантаження статей
            </Alert>
          )}
          
          {data && data.length > 0 && <ArticleList articles={data} />}
          
          {data && data.length === 0 && (
            <Typography variant="body1" className={s.emptyState}>
              Статті не знайдено
            </Typography>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App
