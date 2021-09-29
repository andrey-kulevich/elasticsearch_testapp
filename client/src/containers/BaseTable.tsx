import React from 'react';
import Table, { Size } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer, TablePagination } from '@material-ui/core';
import CustomPaper from './CustomPaper';

export interface ITableProps {
	tableComponent?: {
		stickyHeader?: boolean;
		className?: string;
		size?: Size;
	};
	tableContainer?: {
		className?: string;
	};
	headCells: { props?: TableCellProps; value?: any }[];
	totalRows: number;
	bodyRows: { cells: { props: TableCellProps; value: any }[] }[];
	page: number;
	rowsPerPage: number;
	changePage: (event: unknown, newPage: number) => void;
	changeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	tableRow: {
		onClick: (row: any) => void;
		className?: string;
		hover?: boolean;
	};
}

export const BaseTable = (props: ITableProps): JSX.Element => {
	return (
		<CustomPaper>
			<TableContainer className={props.tableContainer?.className}>
				<Table
					stickyHeader={props.tableComponent && props.tableComponent.stickyHeader}
					className={props.tableComponent && props.tableComponent.className}
					size={props.tableComponent && props.tableComponent.size}
				>
					<TableHead>
						<TableRow>
							{props.headCells.map((elem, index) => (
								<TableCell {...elem.props} key={index}>
									{elem.value}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.bodyRows.map((row, index) => (
							<TableRow
								key={index}
								hover={props.tableRow?.hover}
								className={props.tableRow?.className}
								onClick={() => props.tableRow.onClick(row)}
							>
								{row.cells.map((cell, index) => (
									<TableCell {...cell.props} key={index}>
										{cell.value}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 35]}
				component='div'
				count={props.totalRows}
				rowsPerPage={props.rowsPerPage}
				page={props.page}
				onPageChange={props.changePage}
				onRowsPerPageChange={props.changeRowsPerPage}
			/>
		</CustomPaper>
	);
};
