import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { Typography } from '@material-ui/core';
import ProgressSpinner from './ProgressSpinner';
import useSnackBar from '../hooks/useSnackbar';
import { BaseTable, ITableProps } from '../containers/BaseTable';
import { getAllComments, setParams } from '../store/comments';
import { useHistory } from 'react-router-dom';
import { routes } from '../helpers/routes';

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
	tableRow: {
		cursor: 'pointer',
	},
});

export const CommentsTable = (): JSX.Element => {
	const classes = useStyles();
	const history = useHistory();
	const { snack, openSnack } = useSnackBar();
	const dispatch = useAppDispatch();
	const { comments } = useSelector((state: RootState) => state);

	const handleChangePage = (event: unknown, newPage: number) => {
		dispatch(
			setParams({
				query: comments.queryParams.query,
				from: newPage * comments.queryParams.size,
				size: comments.queryParams.size,
			}),
		);
		dispatch(getAllComments());
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			setParams({
				query: comments.queryParams.query,
				from: 0,
				size: parseInt(event.target.value, 10),
			}),
		);
		dispatch(getAllComments());
	};

	useEffect(() => {
		dispatch(getAllComments());
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
		page: comments.queryParams.from / comments.queryParams.size,
		rowsPerPage: comments.queryParams.size,
		tableRow: {
			className: classes.tableRow,
			onClick: (row) => {
				history.push(routes.goToCommentPage(row.cells[0].value));
			},
			hover: true,
		},
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
