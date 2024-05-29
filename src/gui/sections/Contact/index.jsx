import React, { useEffect, useRef, useState } from 'react';
import { client } from '../../../client';
import './contact.scss'

const CONTENT_ENUM = {
    FORM: 'FORM',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

const errorContent = (
    <>
        <h2 className="head-text">Ooops, Sorry</h2>
        <p className="bold-text">
            An error occurs when sending your message.<br/>
            You can retry in few second.
        </p>
    </>
);

const successContent = (
    <>
        <h2 className="head-text">Thank you for take a pick</h2>
        <p className="bold-text">
            Your message has been sent with success.<br/>
            I will answer you as fast as possible
        </p>
    </>
);

const Contact = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(CONTENT_ENUM.FORM);
    const submitButton = useRef();

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        const contact = {
            _type: 'contacts',
            name: formData.name,
            email: formData.email,
            message: formData.message
        }

        client.create(contact)
        .then(() => {
            setLoading(false);
            setSent(true);
        })
        .catch(e => setError(e));
    };
    const handleInputChange = event => {
        const { name, value } = event.target;

        setFormData({...formData, [name]: value});
    };

    const formContent = (
        <>
            <h2 className="head-text">Ready to start your next project?<br />Contact me now!</h2>
            <p className="bold-text">Let's find how can I help you bring your vision to life.</p>

            <form onSubmit={handleSubmit}>
                <div className="form-input-wrapper"><input type="text" name="name" value={formData.name} placeholder="Enter your name" className="form-item" onChange={handleInputChange} /></div>
                <div className="form-input-wrapper"><input type="email" name="email" value={formData.email} placeholder="Enter your mail" className="form-item" onChange={handleInputChange} /></div>
                <div className="form-input-wrapper"><textarea placeholder="Message" name="message" value={formData.message} className="form-item form-item--textarea" rows="10" onChange={handleInputChange}></textarea></div>
                <div className="form-item-wrapper"><button className="form-item form-item--submit" type="submit" ref={submitButton}>Send Message</button></div>
            </form>
        </>
    );

    useEffect(() => {
        if (sent && !error) {
            submitButton.current.innerHTML = `
                Message Sent
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
            `;
            submitButton.current.classList.add('app__secondarybg');
            setTimeout(() => setContent(CONTENT_ENUM.SUCCESS), 3000);
        } else if (error) {
            setContent(CONTENT_ENUM.ERROR);
            setTimeout(() => setContent(CONTENT_ENUM.FORM), 3000);
        } else if (loading) {
            submitButton.current.innerHTML = '<span class="lds-dual-ring" />';
            submitButton.current.classList.add('app__secondarybg');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, sent, error])

    return (
        <section id="contact" className='app__contact app__container app__container--contact'>
            {
                content === CONTENT_ENUM.FORM ?
                    formContent
                : content === CONTENT_ENUM.SUCCESS ?
                    successContent
                : errorContent
            }
        </section>
    );
}

export default Contact;