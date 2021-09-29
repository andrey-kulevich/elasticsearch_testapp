import React, { useEffect, useState } from 'react';
import { CommentsTable } from '../components/CommentsTable';
import { FiltersPanel } from '../components/FiltersPanel';
import { PageContainer } from '../containers/PageContainer';
import CustomPaper from '../containers/CustomPaper';
import { Button, ButtonGroup } from '@material-ui/core';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getAllComments } from '../store/comments';
import useSnackBar from '../hooks/useSnackbar';

const useStyles = makeStyles({
	paper: {
		marginBottom: '0.5em',
	},
	textarea: {
		border: '1px solid rgba(0,0,0,0.1)',
		borderRadius: '5px',
		maxWidth: '100%',
		minWidth: '100%',
		maxHeight: '80vh',
		minHeight: '80vh',
		padding: '1em',
	},
});

export default function CommentsPage(): JSX.Element {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const { snack, openSnack } = useSnackBar();
	const { comments } = useSelector((state: RootState) => state);
	const [activeTab, setActiveTab] = useState<'table' | 'json'>('table');

	useEffect(() => {
		dispatch(getAllComments());
	}, []);

	useEffect(() => {
		if (comments.status == '404') openSnack('error', `Unable to load posts (${comments.status})`);
	}, [comments.status]);

	return (
		<PageContainer>
			<CustomPaper className={classes.paper}>
				<ButtonGroup
					color='primary'
					aria-label='outlined primary button group'
					orientation={'horizontal'}
					fullWidth
				>
					<Button
						color='primary'
						disableElevation
						fullWidth
						variant={activeTab == 'table' ? 'contained' : 'outlined'}
						onClick={() => setActiveTab('table')}
					>
						TABLE
					</Button>
					<Button
						color='primary'
						disableElevation
						fullWidth
						variant={activeTab == 'json' ? 'contained' : 'outlined'}
						onClick={() => setActiveTab('json')}
					>
						JSON
					</Button>
				</ButtonGroup>
			</CustomPaper>
			{activeTab == 'table' ? (
				<>
					<FiltersPanel />
					<CommentsTable />
				</>
			) : (
				<textarea className={classes.textarea}>{JSON.stringify(comments.comments, null, 4)}</textarea>
			)}
			{snack}
		</PageContainer>
	);
}
