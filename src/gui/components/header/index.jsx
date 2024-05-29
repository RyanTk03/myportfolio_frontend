import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import './header.scss';

const Header = ({logo, navItem}) => {
  const [toggle, setToggle] = useState(false);

  return (
	<header className="app__header">
		<div className="app__header-logo">
			<img src={logo} alt="logo" />
		</div>

		<nav className="app__header-nav">
			<ul className="app__header-nav-links">
				{navItem.map((item) => (
				<li className="app__flex p-text" key={`link-${item}`}>
					<div />
					<a href={`#${item}`}>{item}</a>
				</li>
				))}
			</ul>

			<div className="app__header-menu">
				<HiMenuAlt4 onClick={() => setToggle(true)} />

				{toggle && (
				<motion.div
					whileInView={{ x: [300, 0] }}
					transition={{ duration: 0.85, ease: 'easeOut' }}
				>
					<HiX onClick={() => setToggle(false)} />
					<ul>
					{navItem.map((item) => (
						<li key={item}>
							<a href={`#${item}`} onClick={() => setToggle(false)}>
								{item}
							</a>
						</li>
					))}
					</ul>
				</motion.div>
				)}
			</div>
		</nav>
	</header>
    
  );
};

export default Header;