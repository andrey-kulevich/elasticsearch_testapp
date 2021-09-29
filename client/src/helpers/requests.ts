import { Method } from 'axios';

export interface IRequestParams {
	url: any;
	method: Method;
}

export interface IGetCommentsQueryParams {
	query: string;
	from: number;
	size: number;
}

export const requests: Record<string, IRequestParams> = {
	getComments: {
		url: (params: IGetCommentsQueryParams): string =>
			`comments?q=${params.query}&size=${params.size}&from=${params.from}`,
		method: 'GET',
	},
	getCommentByDocumentId: {
		url: (documentId: number): string => `comments/${documentId}`,
		method: 'GET',
	},
};
