import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { routes } from '../helpers/routes';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginBottom: theme.spacing(2),
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			cursor: 'pointer',
		},
		appBar: {
			backgroundColor: '#fff',
		},
		toolBar: {
			padding: 0,
		},
		user: {
			marginRight: theme.spacing(2),
			'@media not screen and (min-width: 900px)': {
				display: 'none',
			},
		},
	}),
);

export default function Header(): JSX.Element {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div className={classes.root}>
			<AppBar position='static' variant='outlined' className={classes.appBar}>
				<Container>
					<Toolbar variant='dense' className={classes.toolBar}>
						<Typography
							variant='h6'
							className={classes.title}
							onClick={() => history.push(routes.toCommentsPage)}
						>
							Super comments
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
