import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../store/store';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import CustomPaper from '../containers/CustomPaper';
import { getAllComments } from '../store/comments';

const useStyles = makeStyles({
	root: {
		marginBottom: '0.5em',
	},
	grid: {
		'& > *': {
			margin: '0.7em',
		},
	},
	button: {
		height: '100%',
	},
});

export const FiltersPanel = (): JSX.Element => {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState<string>('');

	const handleFilter = () => {
		dispatch(
			getAllComments({
				query: 'name:' + title,
				from: 0,
				size: 10,
			}),
		);
	};

	return (
		<CustomPaper className={classes.root}>
			<Grid container direction='row' className={classes.grid}>
				<Grid container item xs={3} alignItems='center'>
					<Typography variant='h6'>Search by comment title</Typography>
				</Grid>
				<Grid item xs={7}>
					<TextField
						size='small'
						fullWidth
						label='Title'
						variant='outlined'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Grid>
				<Grid container item xs={1} justifyContent={'flex-end'}>
					<Button
						variant='outlined'
						color='primary'
						fullWidth
						className={classes.button}
						onClick={handleFilter}
					>
						filter
					</Button>
				</Grid>
			</Grid>
		</CustomPaper>
	);
};
