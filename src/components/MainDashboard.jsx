import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage';
import PageNotFound from './PageNotFound';

export default function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Router>
    )
}
