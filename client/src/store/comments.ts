import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpHelper } from '../helpers/httpHelper';
import { IGetCommentsQueryParams, requests } from '../helpers/requests';
import { IComment } from '../interfaces/IComment';
import { IElasticSearchResponse } from '../interfaces/IElasticResponse';
import store from './store';

interface ICommentsState {
	comments: IElasticSearchResponse;
	queryParams: IGetCommentsQueryParams;
	currentComment: IComment;
	status: string;
}

export const getAllComments = createAsyncThunk<{ comments: IElasticSearchResponse; status: string }>(
	'comments/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const res = await httpHelper(
				requests.getComments.url(store.getState().comments.queryParams),
				requests.getComments.method,
			);
			return {
				comments: res.data,
				status: res.status as unknown as string,
			};
		} catch (err: any) {
			return rejectWithValue({
				comments: [] as IComment[],
				status: err.response.status as string,
			});
		}
	},
);

export const getCommentByDocumentId = createAsyncThunk<{ currentComment: IComment; status: string }, string>(
	'comments/getByDocumentId',
	async (documentId, { rejectWithValue }) => {
		try {
			const res = await httpHelper(
				requests.getCommentByDocumentId.url(documentId),
				requests.getCommentByDocumentId.method,
			);
			return {
				currentComment: res.data,
				status: res.status as unknown as string,
			};
		} catch (err: any) {
			return rejectWithValue({
				currentComment: {} as IComment,
				status: err.response.status as string,
			});
		}
	},
);

const initState: ICommentsState = {
	comments: {} as IElasticSearchResponse,
	queryParams: {
		query: '*:*',
		from: 0,
		size: 10,
	},
	currentComment: {} as IComment,
	status: '200',
};

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initState,
	extraReducers: (builder) => {
		builder.addCase(getAllComments.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(getAllComments.fulfilled, (state, action) => {
			state.status = action.payload.status;
			state.comments = action.payload.comments;
		});
		builder.addCase(getAllComments.rejected, (state) => {
			state.status = '404';
			state.comments = {} as IElasticSearchResponse;
		});
		builder.addCase(getCommentByDocumentId.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(getCommentByDocumentId.fulfilled, (state, action) => {
			state.status = action.payload.status;
			state.currentComment = action.payload.currentComment;
		});
		builder.addCase(getCommentByDocumentId.rejected, (state) => {
			state.status = '404';
			state.currentComment = {} as IComment;
		});
	},
	reducers: {
		setParams: (state, action) => void (state.queryParams = action.payload),
	},
});

export const { setParams } = commentsSlice.actions;
export default commentsSlice.reducer;
