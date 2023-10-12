// Koristim pages.jsx da ne nakrcam app.js sa komponentama
import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Recipe from './Recipe';
import { Route, Routes, useLocation } from 'react-router-dom';
import Searched from './Searched';
import { AnimatePresence } from 'framer-motion';

// AnimatePresence je wrapper, bez ovog nema fade out

function Pages() {
    const Location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes Location={location} key={location.pathname}>
                {/* bilo samo <Home /> */}
                <Route path="/" element={<Home />} />
                {/* Ako je path / ucitaj komponentu Home */}
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:name" element={<Recipe />} />
            </Routes>
        </AnimatePresence>
    );
}

export default Pages;
