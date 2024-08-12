import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleController } from "../controllers/ArticleController";
import Modal from "../components/Modal";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const articlesPerPage = 5;

    useEffect(() => {
        const allArticles = ArticleController.getArticles();
        setArticles(allArticles.sort((a, b) => b.id - a.id));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const handleDeleteClick = (id) => {
        setSelectedArticleId(id);
        setMessage("Are you sure you want to delete this article?");
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        if (selectedArticleId) {
            ArticleController.deleteArticle(selectedArticleId);
            setArticles(articles.filter(article => article.id !== selectedArticleId));
            setIsModalOpen(false);
            setSelectedArticleId(null);
            setMessage("Article deleted successfully!");
            setIsModalOpen(true); // Open success message modal
        }
    };

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(
        indexOfFirstArticle,
        indexOfLastArticle
    );

    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Articles</h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
                />
                <Link
                    to="/articles/add"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Add Article
                </Link>
            </div>

            <ul className="space-y-4">
                {currentArticles.map((article) => (
                    <li
                        key={article.id}
                        className="p-4 border rounded-lg shadow-md bg-white"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {article.title}
                        </h2>
                        <p className="text-gray-700 mb-2">
                            {article.content.substring(0, 100)}...
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to={`/articles/${article.id}`}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                View Details
                            </Link>
                            <Link
                                to={`/articles/edit/${article.id}`}
                                className="text-yellow-500 hover:text-yellow-700"
                            >
                                Update
                            </Link>
                            <button
                                onClick={() => handleDeleteClick(article.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages).keys()].map((number) => (
                        <button
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === number + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            } hover:bg-blue-400`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal for Delete Confirmation */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message={message}
            />
        </div>
    );
}
