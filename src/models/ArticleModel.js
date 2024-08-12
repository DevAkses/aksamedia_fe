export const ArticleModel = {
    getArticles() {
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        return articles;
    },

    getArticleById(id) {
        const articles = ArticleModel.getArticles();
        return articles.find((article) => article.id === id);
    },

    addArticle(article) {
        const articles = ArticleModel.getArticles();
        articles.push(article);
        localStorage.setItem("articles", JSON.stringify(articles));
    },

    updateArticle(updatedArticle) {
        let articles = ArticleModel.getArticles();
        articles = articles.map((article) =>
            article.id === updatedArticle.id ? updatedArticle : article
        );
        localStorage.setItem("articles", JSON.stringify(articles));
    },

    deleteArticle(id) {
        let articles = ArticleModel.getArticles();
        articles = articles.filter((article) => article.id !== id);
        localStorage.setItem("articles", JSON.stringify(articles));
    },
};
