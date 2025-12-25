import type { Article } from "../types/article";
import axios from "axios";

axios.defaults.baseURL = 'https://api.spaceflightnewsapi.net/v4';

export const fetchArticle = async (id: string): Promise<Article> => {
    const response = await axios.get<Article>(`/articles/${id}`);
    return response.data;
}

