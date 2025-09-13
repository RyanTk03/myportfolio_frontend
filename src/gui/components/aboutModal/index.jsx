import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './aboutModal.scss';

const propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.any,
        description: PropTypes.string
    }),
    handleDisplay: PropTypes.func
};

const defaultProps = {
    content: { title: '', image: '', description: '' },
    handleDisplay: () => {}
};

const AboutModal = ({ content, handleDisplay } = defaultProps) => {
    const [md, setMd] = useState('');
    const modalWrapper = useRef(document.createElement('div'));

    useEffect(() => {
        const wrapper = modalWrapper.current;
        wrapper.classList.add('about-modal');
        document.body.appendChild(wrapper);
        setMd(content.description);

        return () => {
            document.body.removeChild(wrapper);
        };
    }, [content.description]);

    return ReactDOM.createPortal(
        <motion.div
            className="about-modal__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleDisplay(false)}
        >
            <motion.div
                className="about-modal__overlay__content"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // bloque la propagation
            >
                <div className="about-modal__overlay__content__header">
                    <h3 className="bold-text">{content.title}</h3>
                </div>
                <div className="about-modal__overlay__content__body">
                    <div style={{ flex: 1, padding: "8px 16px", fontSize: "1.2rem", lineHeight: "1.5rem" }}>
                        <Markdown>{md}</Markdown>
                    </div>
                    <div style={{ flex: 0.8 }}>
                        <img style={{ width: "100%", height: "100%" }} src={content.image} alt="about" />
                    </div>
                </div>
                <div className="about-modal__overlay__content__footer">
                    <a role="button" href="#contact" onClick={() => handleDisplay(false)}>
                        Contact me
                    </a>
                </div>
            </motion.div>
        </motion.div>,
        modalWrapper.current
    );
};

AboutModal.propTypes = propTypes;
export default AboutModal;
