import React from "react";
import dittohireLogo from './logo.png';
import HeaderClasses from './Header.module.css';


const Header = () => {
	return (
		<div className={HeaderClasses.Header}>
			<img src={dittohireLogo} alt="dittohire logo"></img>
		</div>
	)
}

export default Header;