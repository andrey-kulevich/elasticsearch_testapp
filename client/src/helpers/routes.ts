export const routes = {
	toRoot: '/',
	toCommentsPage: '/comments',
	toCommentPage: '/comments/:commentId',
	goToCommentPage: (commentId: number): string => `/comments/${commentId}`,
};
