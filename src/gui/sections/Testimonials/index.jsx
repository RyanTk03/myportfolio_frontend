import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { getImgUrlFrom, client } from '../../../client';
import './testimonials.scss';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [brands, setBrands] = useState([]);

    const handleClick = (index) => {
		setCurrentIndex(index);
    };

    useEffect(() => {
		const testimonialsQuery = '*[_type == "testimonials"]';
		const brandsQuery = '*[_type == "brands"]';

		client.fetch(testimonialsQuery).then((data) => {
			setTestimonials(data);
		});

		client.fetch(brandsQuery).then((data) => {
			setBrands(data);
		});
    }, []);

    return (
		<section id="testimonials" className="app__testimonials app__container app__container--testimonials">
			<h2 className="head-text">Testimonials</h2>
			{testimonials.length > 0 && (
			<div className="app__testimonial">
				<div className="app__testimonial-item app__flex">
					<img src={getImgUrlFrom(testimonials[currentIndex]?.imageUrl) || '/person-fill.svg'} alt={testimonials[currentIndex].name} />
					<div className="app__testimonial-content">
						<p className="p-text">{testimonials[currentIndex].feedback}</p>
						<div>
							<h4 className="bold-text">{testimonials[currentIndex].name}</h4>
							<h5 className="p-text">{testimonials[currentIndex].company}</h5>
						</div>
					</div>
				</div>

				<div className="app__testimonial-btns app__flex">
					<div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
						<HiChevronLeft />
					</div>

					<div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
						<HiChevronRight />
					</div>
				</div>
			</div>
			)}

			<div className="app__testimonial-brands app__flex">
				{brands.map((brand) => (
					<motion.div
						whileInView={{ opacity: [0, 1] }}
						transition={{ duration: 0.5, type: 'tween' }}
						key={brand._id}
					>
						<img src={getImgUrlFrom(brand.imgUrl)} alt={brand.name} />
					</motion.div>
				))}
			</div>
		</section>
    );
};

export default Testimonials;
