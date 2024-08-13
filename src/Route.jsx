import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleAdd from "./pages/ArticleAdd";
import ArticleUpdate from "./pages/ArticleUpdate";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import { AuthController } from "./controllers/AuthController";

function ProtectedRoute({ children }) {
    if (!AuthController.isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default function AppRoutes() {
    const [username, setUsername] = useState(AuthController.getAuthenticatedUser()?.username || "");

    const handleLogin = (username) => {
        setUsername(username);
    };

    const handleLogout = () => {
        AuthController.logout();
        setUsername("");
    };

    return (
        <>
            {AuthController.isAuthenticated() && <Navbar username={username} onLogout={handleLogout} />}
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/articles"
                    element={
                        <ProtectedRoute>
                            <ArticleList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/articles/add"
                    element={
                        <ProtectedRoute>
                            <ArticleAdd />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/articles/edit/:id"
                    element={
                        <ProtectedRoute>
                            <ArticleUpdate />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/articles/:id"
                    element={
                        <ProtectedRoute>
                            <ArticleDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-profile"
                    element={
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}
