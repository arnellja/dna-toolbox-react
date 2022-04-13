import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GCPercent from './components/gcPercent/gcPercent';
import Home from './components/home/home';
import Navbar from './components/navbar';
import NucleotideCount from './components/nucleotideCount/nucleotideCount';
import ReverseComplement from './components/reverseComp/reverseComp';
import Sidebar from './components/sidebar';
import Transcription from './components/transcription/transcription';
import Translation from './components/translation/translation';

function AppRouter () {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Router>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <Routes>
                <Route element={<Home />} exact path='/' />
                <Route element={<GCPercent />} path='/gc-percent' />
                <Route element={<NucleotideCount />} path='/nucleotide-count' />
                <Route element={<ReverseComplement />} path='/reverse-complement' />
                <Route element={<Transcription />} path='/transcription' />
                <Route element={<Translation />} path='/translation' />
            </Routes>
        </Router>
    )
}

export default AppRouter;