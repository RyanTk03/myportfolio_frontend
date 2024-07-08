import React, { useState, useEffect, useMemo } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { getImgUrlFrom, client } from '../../../client';
import './works.scss'

const Works = () => {
    const [works, setWorks] = useState([]);
    const [filterWork, setFilterWork] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

    useEffect(() => {
        const query = '*[_type == "works"]';

        client.fetch(query).then((data) => {
            setWorks(data);
            setFilterWork(data);
        });
    }, []);

    const tags = useMemo(() => {
        return works.reduce((uniqueTags, work) => {
            for (const tag of work.tags) {
                if (!uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                }
            }
            return uniqueTags;
        }, [])
    }, [works])

    const handleWorkFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
        setAnimateCard([{ y: 0, opacity: 1 }]);

        if (item === 'All') {
            setFilterWork(works);
        } else {
            setFilterWork(works.filter((work) => work.tags.includes(item)));
        }
        }, 500);
    };

    return (
        <section id="works" className="app__works app__container app__container--works">
            <h2 className="head-text">My <span>Portfolio</span> Section</h2>

            <div className="app__work-filter">
                {tags.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleWorkFilter(item)}
                    className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                >
                    {item}
                </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__work-portfolio"
            >
                {filterWork.map((work, index) => (
                <div className="app__work-item app__flex" key={index}>
                    <div className="app__work-img app__flex">
                        <img src={getImgUrlFrom(work.imgUrl)} alt={work.name} />

                        <motion.div
                            whileHover={{ opacity: [0, 1] }}
                            transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                            className="app__work-hover app__flex"
                        >
                            <a href={work.projectLink} target="_blank" rel="noreferrer">
                                <motion.div
                                    whileInView={{ scale: [0, 1] }}
                                    whileHover={{ scale: [1, 0.90] }}
                                    transition={{ duration: 0.25 }}
                                    className="app__flex"
                                >
                                    <AiFillEye />
                                </motion.div>
                            </a>
                            <a href={work.codeLink} target="_blank" rel="noreferrer">
                                <motion.div
                                    whileInView={{ scale: [0, 1] }}
                                    whileHover={{ scale: [1, 0.90] }}
                                    transition={{ duration: 0.25 }}
                                    className="app__flex"
                                >
                                    <AiFillGithub />
                                </motion.div>
                            </a>
                        </motion.div>
                    </div>

                    <div className="app__work-content app__flex">
                        <h4 className="bold-text">{work.title}</h4>
                        <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                        <div className="app__work-tag app__flex">
                            <p className="p-text">{work.tags[0]}</p>
                        </div>
                    </div>
                </div>
                ))}
            </motion.div>
            {works.length === 0 && 
                <div style={{flex: 1}} className="app__flex">
                    <p className="bold-text">Comming soon 😉</p>
                </div>
            }
        </section>
    );
};

export default Works
