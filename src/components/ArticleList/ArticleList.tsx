import type { Article } from "../../types/article";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import s from './ArticleList.module.css';

interface ArticleListProps {
  articles: Article[];
  searchTerm?: string;
}

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) {
    return text;
  }

  const keywords = searchTerm.trim().split(' ').filter(Boolean);
  if (keywords.length === 0) {
    return text;
  }

  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = keywords.some(k => part.toLowerCase() === k.toLowerCase());
        return isMatch ? (
          <mark key={index} className={s.highlight}>{part}</mark>
        ) : (
          part
        );
      })}
    </>
  );
};

export const ArticleList = ({ articles, searchTerm = '' }: ArticleListProps) => {
  return (
    <div className={s.container}>
      {articles.map((article) => (
        <Card key={article.id} className={s.card}>
          <CardMedia
            component="img"
            image={article.image_url}
            alt={article.title}
            className={s.cardMedia}
          />
          <CardContent className={s.cardContent}>
            <div className={s.dateContainer}>
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                {article.published_at}
              </Typography>
            </div>
            
            <div className={s.titleContainer}>
              <Typography variant="h5" component="h2" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: '1.3' }}>
                {highlightText(article.title, searchTerm)}
              </Typography>
            </div>
            
            <Typography variant="body1" className={s.summaryText}>
              {highlightText(
                article.summary.length > 100 
                  ? `${article.summary.substring(0, 100)}...` 
                  : article.summary, 
                searchTerm
              )}
            </Typography>
            
            <Link to={`/article/${article.id}`} className={s.readMoreLink}>
              Read more
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};