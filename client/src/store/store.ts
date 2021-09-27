import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comments';
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		comments: commentsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
	return useDispatch<AppDispatch>();
}

export type RootState = ReturnType<typeof store.getState>;
export default store;
