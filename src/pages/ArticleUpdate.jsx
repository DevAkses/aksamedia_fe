import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleController } from "../controllers/ArticleController";

export default function ArticleUpdate() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const article = ArticleController.getArticleById(id);
        if (article) {
            setTitle(article.title);
            setContent(article.content);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedArticle = { id, title, content };
        ArticleController.updateArticle(updatedArticle);
        navigate("/articles");
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Update Article</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block font-semibold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-semibold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        className="w-full h-48 md:h-64 lg:h-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 resize-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter content"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-200 text-lg font-semibold"
                >
                    Update Article
                </button>
            </form>
        </div>
    );
}
