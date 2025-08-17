import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import './aboutModal.scss'

const propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.any,
        description: PropTypes.string
    }),
    handleDisplay: PropTypes.func
};

const defaultProps = {
    content: {
        title: '',
        image: '',
        description: ''
    },
    handleDisplay: () => {}
};

const AboutModal = ({ content, handleDisplay } = defaultProps) => {
    const [md, setMd] = useState('');
    const modalWrapper = document.createElement('div');

    useEffect(() => {
        modalWrapper.classList.add('about-modal');
        modalWrapper.focus();
        document.body.appendChild(modalWrapper);
        setMd(content.description);

        return () => {
            document.body.removeChild(modalWrapper);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [md])

    return ReactDOM.createPortal(
        <div
            className="about-modal__overlay"
            onClick={() => handleDisplay(false)}
            onScroll={(e) => {e.preventDefault(); e.stopPropagation()}}
        >
            <div className="about-modal__overlay__content">
                <div className="about-modal__overlay__content__header">
                    <h3 className="bold-text">{content.title}</h3>
                </div>
                <div className="about-modal__overlay__content__body">
                    <div style={{flex: 1, padding: "8px 16px", fontSize: "1.2rem", wordSpacing: "0.2rem", lineHeight: "1.5rem"}}>
                        <Markdown>{md}</Markdown>
                    </div>
                    <div style={{flex: 0.8}}><img style={{width: "100%",height: "100%"}} src={content.image} alt="about" /></div>
                </div>
                <div className="about-modal__overlay__content__footer">
                    <a role="button" href="#contact" onClick={() => handleDisplay(false)}>Contact me</a>
                </div>
            </div>
        </div>,
        modalWrapper
    );
}

AboutModal.propTypes = propTypes;

export default AboutModal;
