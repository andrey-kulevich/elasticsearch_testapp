import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { Typography } from '@material-ui/core';
import ProgressSpinner from './ProgressSpinner';
import useSnackBar from '../hooks/useSnackbar';
import { BaseTable, ITableProps } from '../containers/BaseTable';
import { getAllComments } from '../store/comments';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	container: {
		maxHeight: '70vh',
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
	const dispatch = useAppDispatch();
	const { comments } = useSelector((state: RootState) => state);

	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [page, setPage] = useState<number>(0);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
		dispatch(
			getAllComments({
				query: '*:*',
				from: newPage * rowsPerPage,
				size: rowsPerPage,
			}),
		);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rows = parseInt(event.target.value, 10);
		setRowsPerPage(rows);
		setPage(0);
		dispatch(
			getAllComments({
				query: '*:*',
				from: 0,
				size: rows,
			}),
		);
	};

	useEffect(() => {
		dispatch(
			getAllComments({
				query: '*:*',
				from: 0,
				size: 10,
			}),
		);
	}, []);

	useEffect(() => {
		if (comments.status == '404') openSnack('error', `Unable to load posts (${comments.status})`);
	}, [comments.status]);

	const getTableProps: ITableProps = {
		tableComponent: { stickyHeader: true, className: classes.table, size: 'small' },
		tableContainer: { className: classes.container },
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
		totalRows: comments.comments.product ? comments.comments.product.hits.total.value : 0,
		bodyRows: comments.comments.product
			? comments.comments.product.hits.hits.map((comment) => {
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
			  })
			: [],
		changePage: handleChangePage,
		changeRowsPerPage: handleChangeRowsPerPage,
		page: page,
		rowsPerPage: rowsPerPage,
	};

	return comments.status == 'loading' ? (
		<ProgressSpinner />
	) : (
		<>
			{comments.comments.product ? (
				comments.comments.product.hits.hits.length > 0 ? (
					<BaseTable {...getTableProps} />
				) : (
					<Typography className={classes.noPosts}>No comments, uups!</Typography>
				)
			) : (
				<Typography className={classes.noPosts}>Unable to load comments, try again later</Typography>
			)}
			{snack}
		</>
	);
};
