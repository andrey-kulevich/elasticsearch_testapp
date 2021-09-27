import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
	spinner: {
		marginLeft: '1em',
	},
});

export default function ProgressSpinner() {
	const classes = useStyles();

	return <CircularProgress className={classes.spinner} />;
}
