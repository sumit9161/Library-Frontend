import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import AddAuthor from './components/AddAuthor';
import AuthorList from './components/AuthorList';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import AddAuthorWithBooks from './components/AddAuthorWithBooks';
import SingleAuthor from './components/SingleAuthor';
import SingleBook from './components/SingleBook';
import SearchAuthorBook from './components/SearchAuthorBook'

import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className="container mt-4">
                <h2>📚 Library Management System</h2>
                <nav className="nav nav-pills flex-column flex-sm-row mt-3">
                    <NavLink to="/authors" className="flex-sm-fill text-sm-center nav-link">Authors</NavLink>
                    <NavLink to="/add-author-books" className="flex-sm-fill text-sm-center nav-link">Add Author + Books</NavLink>

                    <NavLink to="/books" className="flex-sm-fill text-sm-center nav-link">Books</NavLink>
                    <NavLink to="/add-book" className="flex-sm-fill text-sm-center nav-link">Add Book</NavLink>
                </nav>
                <Routes>
                    <Route path="/authors" element={<AuthorList />} />
                    <Route path="/add-author" element={<AddAuthor />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/add-author-books" element={<AddAuthorWithBooks />} />
                    <Route path="/authors/:id" element={<SingleAuthor />} />
                    <Route path="/books/:id" element={<SingleBook />} />
                    <Route path="/SearchAuthorBook" element={<SearchAuthorBook />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
