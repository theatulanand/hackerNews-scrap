import articleService from "../services/article-service"

class ArticleController{
    async sortByComments() {
        let articles = await articleService.getArticle();
        return articles.sort((a, b) => a.comments - b.comments);
    }

    async sortByPoints() {
        let articles = await articleService.getArticle();
        return articles.sort((a, b) => a.points - b.points);
    }

    async sortByPostingDate() {
        let articles = await articleService.getArticle();
        return articles.sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime());
    }

    async getAllArticle() {
        let article = await articleService.getArticle();
        return article
    }
}

export default new ArticleController()