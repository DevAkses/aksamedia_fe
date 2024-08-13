import React from "react";
import { useParams } from "react-router-dom";
import { ArticleController } from "../controllers/ArticleController";

export default function ArticleDetail() {
    const { id } = useParams();
    const article = ArticleController.getArticleById(id);

    if (!article) return <p>Article not found</p>;

    return (
        <div className="container mx-auto p-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
            <p>{article.content}</p>
        </div>
    );
}
