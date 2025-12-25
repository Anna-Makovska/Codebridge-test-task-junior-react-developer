import type { Article } from "../types/article";
import axios from "axios";

axios.defaults.baseURL = 'https://api.spaceflightnewsapi.net/v4';

interface FetchArticlesResponse {
    results: Article[];
    
}

export const fetchArticles = async (): Promise<Article[]> => {
    const response = await axios.get<FetchArticlesResponse>('/articles');
    return response.data.results;
}