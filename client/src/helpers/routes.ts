export interface IUseParamsTypes {
	commentId: string;
}

export const routes = {
	toRoot: '/',
	toCommentsPage: '/comments',
	toCommentPage: '/comments/:commentId',
	goToCommentPage: (commentId: number): string => `/comments/${commentId}`,
};
