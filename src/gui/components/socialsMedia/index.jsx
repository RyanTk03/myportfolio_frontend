import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { FaHashnode } from 'react-icons/fa6'
import './socialsMedia.scss'

const SocialsMedia = () => {
    return (
        <div className="app__social">
            <div className="app_social__icon">
                <a href="https://www.linkedin.com/in/rayane-toko" target='_blank' rel='noreferrer'>
                    <BsLinkedin href="" />
                </a>
            </div>
            <div className="app_social__icon">
                <a href="https://hashnode.com/@RayaneTOKO" target='_blank' rel='noreferrer'>
                    <FaHashnode />
                </a>
            </div>
            <div className="app_social__icon app_social__icon--github">
                <a href="https://github.com/RyanTk03" target='_blank' rel='noreferrer'>
                    <BsGithub />
                </a>
            </div>
        </div>
    );
}

export default SocialsMedia;
