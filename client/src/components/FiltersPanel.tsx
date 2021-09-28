import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import CustomPaper from '../containers/CustomPaper';

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
	//const { users } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const [title, setTitle] = useState<string>('');
	const [userId, setUserId] = useState<number>(-1);

	const handleFilter = () => {
		//if (userId !== -1) dispatch(filterByUser(userId));
		//if (title !== '') dispatch(filterByTitle(title));
	};

	return (
		<CustomPaper className={classes.root}>
			<Grid container direction='row' className={classes.grid}>
				<Grid container item xs={2} alignItems='center'>
					<Typography variant='h6'>Filter by</Typography>
				</Grid>
				<Grid item xs={4}>
					<TextField
						size='small'
						fullWidth
						label='Title'
						id='selectPeriod'
						variant='outlined'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						size='small'
						fullWidth
						label='User'
						select
						id='selectPeriod'
						variant='outlined'
						value={userId}
						onChange={(e) => setUserId(e.target.value as unknown as number)}
					>
						{/*{users.value.map((elem) => (*/}
						{/*	<MenuItem key={elem.id} value={elem.id}>*/}
						{/*		{elem.name}*/}
						{/*	</MenuItem>*/}
						{/*))}*/}
					</TextField>
				</Grid>
				<Grid item xs={1}>
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
