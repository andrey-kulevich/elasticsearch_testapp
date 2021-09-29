import React, { useEffect } from 'react';
import {
	createStyles,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import { RootState, useAppDispatch } from '../store/store';
import { getCommentByDocumentId } from '../store/comments';
import { useSelector } from 'react-redux';
import { PageContainer } from '../containers/PageContainer';
import { useParams } from 'react-router-dom';
import { IUseParamsTypes } from '../helpers/routes';
import ProgressSpinner from '../components/ProgressSpinner';
import CustomPaper from '../containers/CustomPaper';
import { EmailOutlined, DescriptionOutlined, LockOutlined, TitleOutlined } from '@material-ui/icons';

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
	const { commentId } = useParams<IUseParamsTypes>();

	useEffect(() => {
		dispatch(getCommentByDocumentId(commentId));
	}, []);

	return (
		<PageContainer>
			{comments.status == 'loading' ? (
				<ProgressSpinner />
			) : (
				<CustomPaper className={classes.root}>
					{comments.currentComment._source && (
						<>
							<Typography variant={'h6'}>Document (id = {comments.currentComment._id})</Typography>
							<List dense>
								<ListItem>
									<ListItemIcon>
										<LockOutlined />
									</ListItemIcon>
									<ListItemText
										primary={'Comment ID'}
										secondary={comments.currentComment._source.id}
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<LockOutlined />
									</ListItemIcon>
									<ListItemText
										primary={'Post ID'}
										secondary={comments.currentComment._source.postId}
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<EmailOutlined />
									</ListItemIcon>
									<ListItemText
										primary={'E-Mail'}
										secondary={comments.currentComment._source.email}
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<TitleOutlined />
									</ListItemIcon>
									<ListItemText primary={'Title'} secondary={comments.currentComment._source.name} />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<DescriptionOutlined />
									</ListItemIcon>
									<ListItemText
										primary={'Description'}
										secondary={comments.currentComment._source.body}
									/>
								</ListItem>
							</List>
						</>
					)}
				</CustomPaper>
			)}
		</PageContainer>
	);
}
