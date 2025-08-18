import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, getImgUrlFrom } from '../../../client';
import './skills.scss';

const linkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"/>
    </svg>
);

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [learnings, setLearnings] = useState([]);

    useEffect(() => {
        const skillsQuery = '*[_type == "skills"]';
        const learningsQuery = '*[_type == "learnings"]';

        client.fetch(skillsQuery)
        .then(data => setSkills(data))
        .catch(e => console.log(e));

        client.fetch(learningsQuery)
        .then(data => setLearnings(data))
        .catch(e => console.log(e));
    }, [])
    
    return (
        <section id="skills" className='app__skills app__container app__container--skills'>
            <h2 className="head-text">My skills & learnings journeys</h2>
            <motion.div
                whileInView={{
                    opacity: [0, 1],
                    transition: {
                        duration: 2
                    }
                }}
                className="app__flex"
            >
                <motion.div
                    whileInView={{
                        x: [-100, 0],
                        transition: {
                            duration: 1
                        }
                    }}
                    className="app__flex"
                >
                    <div className="app__skills-circle">
                        {skills.map((skill, index) => {
                            const angle = (360 / skills.length) * index;
                            const radius = 200;

                            const centerX = 200;
                            const centerY = 200;
                            const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
                            const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <div
                                    className="skill-item app__flex"
                                    key={index}
                                    style={{ transform: `translate(${x}px, ${y}px)` }}
                                >
                                    <div className="app__circle">
                                        <img src={getImgUrlFrom(skill.icon)} alt="skill icon" />
                                    </div>
                                    <p className="p-text">{skill.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
                <motion.div
                    className="learning-items"
                    whileInView={{
                        x: [100, 0],
                        transition: {
                            duration: 1
                        }
                    }}
                >
                    {
                        learnings.map((learning, index) => (
                            <div className="app__flex learning-item" key={index}>
                                <div className="learning-item__left app__flex">
                                    <div className="app__circle">
                                        <img src={getImgUrlFrom(learning.icon)} alt="" />
                                    </div>
                                    <p className="bold-text">{learning.year}</p>
                                </div>
                                <div className="learning-item__right app__flex">
                                    <h4 className="bold-text">{learning.title}</h4>
                                    <a
                                        href={learning.proofLink}
                                        target="_blank" rel="noreferrer"
                                    >
                                        link {linkIcon}
                                    </a>
                                </div>
                            </div>
                        ))
                    }
                </motion.div>

            </motion.div>
        </section>
    );
}

export default Skills;