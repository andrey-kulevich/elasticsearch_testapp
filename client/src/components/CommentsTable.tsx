import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Typography } from '@material-ui/core';
import ProgressSpinner from './ProgressSpinner';
import useSnackBar from '../hooks/useSnackbar';
import { BaseTable, ITableProps } from '../containers/BaseTable';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	container: {
		maxHeight: 550,
	},
	noPosts: {
		margin: '1em',
	},
	headerCell: {
		cursor: 'pointer',
	},
});

export const CommentsTable = (): JSX.Element => {
	const classes = useStyles();
	const { snack, openSnack } = useSnackBar();
	const { comments } = useSelector((state: RootState) => state);

	useEffect(() => {
		if (comments.status == '404') openSnack('error', `Unable to load posts (${comments.status})`);
		console.log(comments);
	}, [comments.status]);

	const getTableProps = (): ITableProps => {
		return {
			tableComponent: { stickyHeader: true, className: classes.table, size: 'small' },
			headCells: [
				{
					props: {
						className: classes.headerCell,
					},
					value: 'Document ID',
				},
				{
					props: {
						className: classes.headerCell,
					},
					value: 'Comment ID',
				},
				{
					props: {
						className: classes.headerCell,
					},
					value: 'Post ID',
				},
				{ props: undefined, value: 'Comment Title' },
			],
			bodyRows: comments.comments.product.hits.hits.map((comment) => {
				return {
					cells: [
						{
							props: { component: 'th', scope: 'row' },
							value: comment._id,
						},
						{
							props: { component: 'th', scope: 'row' },
							value: comment._source.id,
						},
						{
							props: { component: 'th', scope: 'row' },
							value: comment._source.postId,
						},
						{
							props: { component: 'th', scope: 'row' },
							value: comment._source.name,
						},
					],
				};
			}),
		};
	};

	return comments.status == 'loading' ? (
		<ProgressSpinner />
	) : (
		<TableContainer component={Paper} variant='outlined' className={classes.container}>
			{comments.comments.product ? (
				comments.comments.product.hits.hits.length > 0 ? (
					<BaseTable {...getTableProps()} />
				) : (
					<Typography className={classes.noPosts}>No comments, uups!</Typography>
				)
			) : (
				<Typography className={classes.noPosts}>Unable to load comments, try again later</Typography>
			)}
			{snack}
		</TableContainer>
	);
};
