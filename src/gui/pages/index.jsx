import React from 'react';
import { images } from '../../assets/images';
import { Header, Footer, SocialsMedia } from '../components';
import { Hero, About, Skills, Works, Contact, Testimonials } from '../sections';

/**
 * 
 */
const Index = () => {
    const navItem = ['home', 'about', 'skills', 'works', 'contact']
    return (
        <>
            <Header logo={images.logo} navItem={navItem} />
            <main>
                <Hero />
                <About />
                <Skills />
                <Works />
                <Testimonials />
                <Contact />
                <SocialsMedia />
            </main>
            <Footer />
        </>
    )
}

export default Index;
