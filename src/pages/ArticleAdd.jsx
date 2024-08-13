import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleController } from "../controllers/ArticleController";

export default function ArticleAdd() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArticle = {
            id: Date.now().toString(),
            title,
            content,
        };
        ArticleController.addArticle(newArticle);
        navigate("/articles");
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Add New Article</h1>
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
                    className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-200 text-lg font-semibold"
                >
                    Add Article
                </button>
            </form>
        </div>
    );
}
