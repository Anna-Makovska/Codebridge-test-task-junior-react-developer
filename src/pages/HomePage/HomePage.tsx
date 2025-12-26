import { useState, useMemo, useEffect } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ArticleList } from '../../components/ArticleList/ArticleList';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '../../services/fetchArticles';
import { Typography, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import toast from 'react-hot-toast';
import s from './HomePage.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити статті. Спробуйте оновити сторінку.');
    }
  }, [isError]);

  const filteredArticles = useMemo(() => {
    const results = data?.results;
    if (!results || !searchTerm.trim()) {
      return results || [];
    }

    const keywords = searchTerm.toLowerCase().trim().split(/\s+/);

    return results
      .map((article) => {
        const titleLower = article.title.toLowerCase();
        const summaryLower = article.summary.toLowerCase();

        const titleMatches = keywords.filter(keyword => titleLower.includes(keyword)).length;
        const summaryMatches = keywords.filter(keyword => summaryLower.includes(keyword)).length;

        const priority = titleMatches > 0 ? titleMatches * 1000 + summaryMatches : summaryMatches;

        return {
          article,
          priority,
        };
      })
      .filter(item => item.priority > 0)
      .sort((a, b) => b.priority - a.priority)
      .map(item => item.article);
  }, [data?.results, searchTerm]);

  const totalCount = searchTerm ? filteredArticles.length : Math.min(data?.count || 0, 100);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.app}>
        <header className={s.header}>
          <div className={s.searchHeader}>
            <Typography variant="body1" className={s.searchLabel} sx={{ fontSize: '16px', fontWeight: 600 }}>
              Filter by keywords
            </Typography>
            <SearchBar onSearchChange={setSearchTerm} />
          </div>
        </header>
        <main className={s.main}>
          <div className={s.resultsHeaderContainer}>
            <div className={s.resultsHeader}>
              <Typography variant="h6" className={s.resultsText} sx={{ fontSize: '16px', fontWeight: 600 }}>
                Results: {totalCount}
              </Typography>
              <Divider className={s.divider} />
            </div>
          </div>

          {isLoading && <LoadingSpinner message="Завантаження статей..." />}

          {isError && (
            <ErrorMessage
              title="Помилка завантаження"
              message={error instanceof Error ? error.message : 'Не вдалося завантажити статті'}
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && filteredArticles.length > 0 && (
            <ArticleList articles={filteredArticles} searchTerm={searchTerm} />
          )}

          {!isLoading && !isError && filteredArticles.length === 0 && searchTerm && (
            <Typography variant="body1" className={s.emptyState}>
              Статті не знайдено за запитом "{searchTerm}"
            </Typography>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

