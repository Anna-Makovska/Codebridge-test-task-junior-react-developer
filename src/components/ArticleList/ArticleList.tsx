import type { Article } from "../../types/article";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import s from './ArticleList.module.css';

export const ArticleList = ({ articles }: { articles: Article[] }) => {
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
                {article.title}
              </Typography>
            </div>
            
            <Typography variant="body1" className={s.summaryText}>
              {article.summary}
            </Typography>
            
            <div className={s.readMoreLink}>
              Read more
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};