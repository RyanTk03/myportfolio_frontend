import React, { useEffect, useState } from 'react';
import './about.scss'
import AboutCard from '../../components/aboutCard';
import { getImgUrlFrom, client } from '../../../client';

const About = () => {
    const [abouts, setAbouts] = useState([]);

    useEffect(() => {
        const query = '*[_type == "abouts"]';

        client.fetch(query)
        .then((data) => setAbouts(data.map((d) => ({...d, image: getImgUrlFrom(d.image)}))))
        .catch((e) => console.log(e));

    }, [])

    return (
        <section id="about" className='app__container app__container--about app__about'>
            <h2 className="app__about__headline head-text">Who am I ?</h2>
            <div className="app__about__profil-cards app__flex">
                { abouts.map((about, index) => <AboutCard key={index} content={about} />) }
            </div>
        </section>
    );
}

export default About;
