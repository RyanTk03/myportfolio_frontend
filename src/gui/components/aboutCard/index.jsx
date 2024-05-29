import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './aboutCard.scss';
import AboutModal from '../aboutModal';

const propTypes = {
    content: PropTypes.shape({
        image: PropTypes.any,
        title: PropTypes.string,
        overview: PropTypes.string,
        description: PropTypes.string,
    })
};

const defaultProps = {
    content: {
        image: '',
        title: '',
        overview: '',
        description: ''
    }
};


const AboutCard = ({ content } = defaultProps) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.div
                whileInView={{
                    opacity: [0, 1],
                    transition: {
                        duration: 0.6
                    }
                }}
                whileHover={{
                    scale: 1.1
                }}
                onClick={ () => setShowModal(true) }
                className="about-card"
            >
                <div className="about-card__img">
                    <img src={content.image} alt="stack illustration" />
                </div>
                <div className="profil-card__footer">
                    <h3 className="bold-text">{content.title}</h3>
                    <p className="p-text">{content.overview}</p>
                </div>
            </motion.div>
            { showModal && <AboutModal content={content} handleDisplay={setShowModal} /> }
        </>
    );
}

AboutCard.propTypes = propTypes;

export default AboutCard;
