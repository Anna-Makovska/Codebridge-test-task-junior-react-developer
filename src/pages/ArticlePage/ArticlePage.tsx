import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../../services/fetchArticle";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Button } from "../../components/Button/Button";
import { Container, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import toast from "react-hot-toast";
import { useEffect } from "react";
import ArrowLeftIcon from "../../icons/Arrow - Left.svg";
import s from "./ArticlePage.module.scss";

const theme = createTheme({
  typography: {
    fontFamily:
      "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
});

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Не вдалося завантажити статтю");
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
            <Box className={s.backButtonContainer}>
              <Button to="/" icon={ArrowLeftIcon} iconPosition="left">
                Back to homepage
              </Button>
            </Box>

            <ErrorMessage
              message="Не вдалося завантажити статтю"
              onRetry={() => refetch()}
            />
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
          />

          <div className={s.contentBox}>
            <Typography
              component="h1"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "24px",
                fontWeight: 400,
                color: "#363636",
                textAlign: "center",
                mb: "50px",
              }}
            >
              {data.title}
            </Typography>

            <Typography
              component="p"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "150%",
                color: "#000",
              }}
            >
              {data.summary}
            </Typography>
          </div>
        </div>

        <Container maxWidth="lg">
          <div className={s.articleContent}>
            <Box className={s.backButtonContainer}>
              <Button to="/" icon={ArrowLeftIcon} iconPosition="left">
                Back to homepage
              </Button>
            </Box>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}
