import ArticleData from "../interfaces/article-interface";
import { ArticleModel } from "../models/article-model";

class ArticleService{
    async createArticle(data: ArticleData) {
        try {
            let createdData = ArticleModel.create(data);
            return createdData;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

    async getArticle() {
        try {
            let ArticleData = await ArticleModel.find({});
            return ArticleData;
        } catch (error) {
            console.log("Error while getting Article");
            throw error;
        }
    }

    async getArticleById(id: string) {
        try {
            let ArticleData = await ArticleModel.findOne({id: id});
            return ArticleData;
        } catch (error) {
            console.log("Error while getting Article");
            throw error;
        }
    }
}

export default new ArticleService();