import React, { ReactChild } from 'react';
import Header from '../components/Header';
import { Container, CssBaseline } from '@material-ui/core';

export const PageContainer = ({ children }: { children: ReactChild[] | ReactChild }): JSX.Element => {
	return (
		<>
			<Header />
			<CssBaseline />
			<Container>{children}</Container>
		</>
	);
};
