import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchArticle } from '../../services/fetchArticle';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Container, Typography, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import s from './ArticlePage.module.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити статтю');
    }
  }, [isError]);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={s.container}>
          <LoadingSpinner message="Завантаження статті..." />
        </div>
      </ThemeProvider>
    );
  }

  if (isError || !data) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={s.container}>
          <Container maxWidth="lg">
            <div className={s.articleContent}>
              <ErrorMessage 
                title="Помилка завантаження статті"
                message={error instanceof Error ? error.message : 'Не вдалося завантажити статтю'}
                onRetry={() => refetch()}
              />
              <Box className={s.backButtonContainer}>
                <Button
                  variant="contained"
                  startIcon={<FiArrowLeft />}
                  onClick={() => navigate('/')}
                  className={s.backButton}
                >
                  Back to Home Page
                </Button>
              </Box>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.container}>
        <div className={s.heroSection}>
          <div 
            className={s.heroImage}
            style={{ backgroundImage: `url(${data.image_url})` }}
          >
            <div className={s.heroOverlay}>
              <Container maxWidth="lg">
                <Typography variant="h3" component="h1" className={s.heroTitle}>
                  {data.title}
                </Typography>
              </Container>
            </div>
          </div>
        </div>
        
        <Container maxWidth="lg">
          <div className={s.articleContent}>
            <Typography variant="body1" className={s.articleText}>
              {data.summary.replace(/\[\.\.\.\]/g, '').trim()}
            </Typography>
            
            <Box className={s.backButtonContainer}>
              <Button
                variant="contained"
                startIcon={<FiArrowLeft />}
                onClick={() => navigate('/')}
                className={s.backButton}
              >
                Back to Home Page
              </Button>
            </Box>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

