import React from 'react';
import Header from './Header/Header';
import Content from './Content/Content';
import LayoutClasses from './Layout.module.css';

const Layout = (props) => {
	return (
		<div className={LayoutClasses.Layout}>
			<Header />
			<Content />
		</div>
	);
}

export default Layout;