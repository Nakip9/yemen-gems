import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';

const AboutTeaser = lazy(() => import('../components/AboutTeaser'));
const Destinations = lazy(() => import('../components/Destinations'));
const Gallery = lazy(() => import('../components/Gallery'));
const FAQ = lazy(() => import('../components/FAQ'));

const Home: React.FC = () => {
    return (
        <>
            <SEO />
            <Hero />
            <Suspense fallback={<div className="py-20 flex justify-center"><LoadingSpinner /></div>}>
                <AboutTeaser />
                <Destinations />
                <Gallery />
                <FAQ />
            </Suspense>
        </>
    );
};

export default Home;
