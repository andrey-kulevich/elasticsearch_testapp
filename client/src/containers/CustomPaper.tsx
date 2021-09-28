import React, { ReactNode } from 'react';
import { Paper } from '@material-ui/core';

export default function CustomPaper({ children, className }: { children: ReactNode; className?: string }): JSX.Element {
	return (
		<Paper className={className} variant={'outlined'}>
			{children}
		</Paper>
	);
}
