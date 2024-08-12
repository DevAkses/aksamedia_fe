import { ArticleModel } from "../models/ArticleModel";

export const ArticleController = {
    getArticles() {
        return ArticleModel.getArticles();
    },

    getArticleById(id) {
        return ArticleModel.getArticleById(id);
    },

    addArticle(article) {
        return ArticleModel.addArticle(article);
    },

    updateArticle(article) {
        return ArticleModel.updateArticle(article);
    },

    deleteArticle(id) {
        return ArticleModel.deleteArticle(id);
    },
};
