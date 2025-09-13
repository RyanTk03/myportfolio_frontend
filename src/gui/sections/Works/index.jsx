import { useState, useEffect, useMemo } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { getImgUrlFrom, client } from '../../../client';
import './works.scss'
import WorkModal from '../../components/workModal';

const Works = () => {
    const [works, setWorks] = useState([]);
    const [filterWork, setFilterWork] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [selectedWork, setSelectedWork] = useState();

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
                <div
                    onClick={() => handleWorkFilter('All')}
                    className={`app__work-filter-item app__flex p-text ${activeFilter === 'All' ? 'item-active' : ''}`}
                >
                    All
                </div>
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
                initial={{ opacity: 0, y: 50 }}
                animate={animateCard}
                transition={{ duration: 0.5 }}
                className="app__work-portfolio"
            >
            {filterWork.map((work, index) => (
                <motion.div
                    className="app__work-item app__flex"
                    key={index}
                    whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0,0,0,0.2)' }}
                    onClick={() => setSelectedWork(work)}
                >
                    <div className="app__work-img app__flex">
                        <img src={getImgUrlFrom(work.image)} alt={work.name} />

                        <motion.div
                            className="app__work-hover app__flex"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {work.projectLink && (
                                <a href={work.projectLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <motion.div
                                        whileHover={{ scale: 0.9 }}
                                        className="icon-wrapper"
                                    >
                                        <AiFillEye />
                                    </motion.div>
                                </a>
                            )}
                            {work.codeLink && (
                                <a href={work.codeLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <motion.div
                                        whileHover={{ scale: 0.9 }}
                                        className="icon-wrapper"
                                    >
                                        <AiFillGithub />
                                    </motion.div>
                                </a>
                            )}
                        </motion.div>

                        <div className="app__work-tag app__flex">
                            <p className="p-text">{activeFilter !== 'All' ? activeFilter : work.tags[0]}</p>
                        </div>
                    </div>

                    <div className="app__work-content app__flex">
                        <h4 className="bold-text">{work.title}</h4>
                        <p className="p-text app__work-description">{work.description}</p>
                    </div>
                </motion.div>
            ))}
            </motion.div>{/* Modal */}
            {selectedWork && (
                <WorkModal
                    work={{
                        ...selectedWork,
                        image: getImgUrlFrom(selectedWork.image),
                    }}
                    handleDisplay={() => setSelectedWork(null)}
                />
            )}
        </section>
    );
};

export default Works
