import React from 'react';
import { CommentsTable } from '../components/CommentsTable';
import { FiltersPanel } from '../components/FiltersPanel';
import { PageContainer } from '../containers/PageContainer';

export default function CommentsPage(): JSX.Element {
	return (
		<PageContainer>
			<FiltersPanel />
			<CommentsTable />
		</PageContainer>
	);
}
