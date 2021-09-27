import { Method } from 'axios';

export interface IRequestParams {
	url: any;
	method: Method;
}

export const requests: Record<string, IRequestParams> = {
	getComments: {
		url: 'comments',
		method: 'GET',
	},
	getCommentById: {
		url: (commentId: number): string => `comments/${commentId}`,
		method: 'GET',
	},
};
