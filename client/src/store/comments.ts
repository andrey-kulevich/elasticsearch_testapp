import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpHelper } from '../helpers/httpHelper';
import { IGetCommentsQueryParams, requests } from '../helpers/requests';
import { IComment } from '../interfaces/IComment';
import { IElasticSearchResponse } from '../interfaces/IElasticResponse';

interface ICommentsState {
	comments: IElasticSearchResponse;
	currentComment: IComment;
	status: string;
}

export const getAllComments = createAsyncThunk<
	{ comments: IElasticSearchResponse; status: string },
	IGetCommentsQueryParams
>('comments/getAll', async (params, { rejectWithValue }) => {
	try {
		const res = await httpHelper(requests.getComments.url(params), requests.getComments.method);
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
});

const initState: ICommentsState = {
	comments: {} as IElasticSearchResponse,
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
	},
	reducers: {},
});

export default commentsSlice.reducer;
