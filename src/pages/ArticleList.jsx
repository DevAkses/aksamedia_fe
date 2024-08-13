import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArticleController } from "../controllers/ArticleController";
import Modal from "../components/Modal";
import Snackbar from "../components/Snackbar";
import queryString from 'query-string';
import searchIcon from '/src/assets/icons/icons8-search.svg';

export default function ArticleList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const articlesPerPage = 5;

    const fetchArticles = async () => {
        try {
            const allArticles = await ArticleController.getArticles();
            setArticles(allArticles.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
        const term = queryParams.search || "";

        setSearchTerm(term);
        setFilterTerm(term);
        setCurrentPage(page);
    }, [location.search]);

    useEffect(() => {
        const queryParams = {
            search: filterTerm,
            page: currentPage,
        };
        const newUrl = `?${queryString.stringify(queryParams)}`;
        navigate(newUrl, { replace: true });
    }, [filterTerm, currentPage, navigate]);

    useEffect(() => {
        const darkMode = localStorage.getItem("darkMode") === "true";
        document.body.classList.toggle("dark", darkMode);
    }, []);

    const handleSearchClick = () => {
        setFilterTerm(searchTerm);
        setCurrentPage(1);
    };

    const handleDeleteClick = (id) => {
        setSelectedArticleId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedArticleId) {
            try {
                await ArticleController.deleteArticle(selectedArticleId);
                setArticles(prevArticles => prevArticles.filter(article => article.id !== selectedArticleId));
                setSnackbarMessage("Article deleted successfully!");
                setIsSnackbarOpen(true);
                setIsModalOpen(false);
                setSelectedArticleId(null);
                setTimeout(() => setIsSnackbarOpen(false), 3000);
            } catch (error) {
                console.error("Failed to delete article:", error);
            }
        }
    };

    const filteredArticles = useMemo(() => 
        articles.filter((article) =>
            article.title.toLowerCase().startsWith(filterTerm.toLowerCase())
        ), [articles, filterTerm]
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
            <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">Articles</h1>

            <div className="flex justify-between items-center mb-4">
                <div className="flex w-2/3 max-w-xs">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-l-lg p-2 flex-grow dark:bg-gray-800 dark:text-white"
                    />
                    <button 
                        onClick={handleSearchClick}
                        className="bg-blue-500 text-white p-2 rounded-r-lg dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        <img src={searchIcon} alt="Search" className="w-6 h-6" />
                    </button>
                </div>
                <Link
                    to="/articles/add"
                    className="bg-green-500 text-white px-2 py-2 rounded-lg hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                    Add Article
                </Link>
            </div>

            <ul className="space-y-4">
                {currentArticles.length > 0 ? (
                    currentArticles.map((article) => (
                        <li
                            key={article.id}
                            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:text-white"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {article.title}
                            </h2>
                            <p className="text-gray-700 mb-2 dark:text-gray-400">
                                {article.content.substring(0, 100)}...
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    to={`/articles/${article.id}`}
                                    className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400"
                                >
                                    View Details
                                </Link>
                                <Link
                                    to={`/articles/edit/${article.id}`}
                                    className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-300 dark:hover:text-yellow-400"
                                >
                                    Update
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(article.id)}
                                    className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500 dark:text-gray-400">No articles found</li>
                )}
            </ul>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages).keys()].map((number) => (
                        <button
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === number + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            } hover:bg-blue-400 dark:hover:bg-blue-600`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            )}

            {isSnackbarOpen && (
                <Snackbar
                    message={snackbarMessage}
                    isOpen={isSnackbarOpen}
                    onClose={() => setIsSnackbarOpen(false)}
                />
            )}

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}
