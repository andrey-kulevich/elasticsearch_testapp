import React, { useEffect } from 'react';
import { Container, createStyles, Fab, Grid, makeStyles, Theme } from '@material-ui/core';
import { RootState, useAppDispatch } from '../store/store';
import { getAllComments } from '../store/comments';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(2),
			},
		},
	}),
);

export default function CommentPage(): JSX.Element {
	const classes = useStyles();
	const { comments } = useSelector((state: RootState) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		//dispatch(getAllComments());
	}, []);

	return <Container>aaaa</Container>;
}
