import type { Article } from "../types/article";
import axios from "axios";

axios.defaults.baseURL = 'https://api.spaceflightnewsapi.net/v4';

export interface PaginatedArticleList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Article[];
}

export const fetchArticles = async (): Promise<PaginatedArticleList> => {
    const response = await axios.get<PaginatedArticleList>('/articles/?limit=100');
    
    return {
        count: Math.min(response.data.count, 100), 
        next: response.data.next,
        previous: response.data.previous,
        results: response.data.results,
    };
}
