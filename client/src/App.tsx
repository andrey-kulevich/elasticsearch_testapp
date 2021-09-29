import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core';
import { routes } from './helpers/routes';
import CommentsPage from './pages/CommentsPage';
import CommentPage from './pages/CommentPage';

export const theme = createTheme({
	palette: {
		background: {
			default: '#f6f6f6',
		},
		primary: {
			main: '#97de75',
		},
		secondary: {
			main: '#e57373',
		},
		success: {
			main: '#4791db',
		},
	},
});

export default function App(): JSX.Element {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path={routes.toRoot}>
						<Redirect to={routes.toCommentsPage} />
					</Route>
					<Route exact path={routes.toCommentsPage}>
						<CommentsPage />
					</Route>
					<Route exact path={routes.toCommentPage}>
						<CommentPage />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}
