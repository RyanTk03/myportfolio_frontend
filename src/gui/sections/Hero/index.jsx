import React from 'react';
import { motion } from 'framer-motion'

import { images } from '../../../assets/images'

import './hero.scss';

const Hero = () => {
    return (
        <section id="home" className='app__hero app__container app__container--hero'>
            <div className="app__hero__head">
                <motion.div
                    whileInView={{
                        x: [-100, 0],
                        opacity: [0, 1]
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    className='app__hero__head__info'
                >
                    <div className="app__hero__head__info__presentation">
                        <span className="p-text hand-wave">👋</span>
                        <div>
                            <p className="p-text">Hello, I'm</p>
                            <h1 className="head-text">Rayane</h1>
                        </div>
                    </div>
                    <div className="app__hero__head__info__skills-tags">
                        <p className="p-text p-text--skill-tag">fullstack developper</p>
                        <p className="p-text p-text--skill-tag">software engineer</p>
                        <p className="p-text p-text--skill-tag">data analyst</p>
                    </div>
                    <div className="app__hero__head__info__greeting">
                        <p className="p-text p-text--greeting">Welcome to my world</p>
                    </div>

                </motion.div>

                <motion.div
                    className='app__hero__head__profile'
                    whileInView={{
                        y: [-100, 0],
                    }}
                    transition={{
                        duration: 0.3
                    }}
                >
                    <img
                        src={ images.profile }
                        alt="profil"
                        width="200px"
                        height="200px"
                    />
                </motion.div>
                <motion.div
                    className="app__hero__head__tech-imgs"
                    whileInView={{
                        x: [100, 0]
                    }}
                    transition={{
                        duration: 0.8
                    }}
                >
                    <div className="app__hero__head__tech-imgs__col">
                        {
                            [images.figma, images.react, images.redux, images.typescript].map((imgSrc, i) => 
                                <div className="app__circle app__circle--hero" key={i}>
                                    <img src={imgSrc} alt="techno" />
                                </div>
                            )
                        }
                    </div>
                    <div className="app__hero__head__tech-imgs__col">
                    {
                        [images.node, images.mongodb, images.laravel, images.mysql].map((imgSrc, i) => 
                            <div className="app__circle app__circle--hero" key={i}>
                                <img src={imgSrc} alt="techno" />
                            </div>
                        )
                    }
                    </div>

                </motion.div>
            </div>
            <div className="app__hero__foot">
                <motion.div
                    whileInView={{
                        y: [-100, 0],
                        transition: {
                            duration: 0.5
                        }
                    }}
                >
                    {
                        [images.jira, images.git, images.firebase, images.sanity].map((imgSrc, i) => 
                            <div className="app__circle app__circle--hero" key={i}>
                                <img src={imgSrc} alt="techno" />
                            </div>
                        )
                    }
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
