import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { CommentsTable } from '../components/CommentsTable';
import { Container, createStyles, Fab, Grid, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { RootState, useAppDispatch } from '../store/store';
import { getAllComments } from '../store/comments';
import { useSelector } from 'react-redux';
import { FiltersPanel } from '../components/FiltersPanel';
import { PageContainer } from '../containers/PageContainer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(2),
			},
		},
	}),
);

export default function CommentsPage(): JSX.Element {
	const classes = useStyles();
	const { comments } = useSelector((state: RootState) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllComments());
	}, []);

	return (
		<PageContainer>
			<FiltersPanel />
			<CommentsTable />
		</PageContainer>
	);
}
