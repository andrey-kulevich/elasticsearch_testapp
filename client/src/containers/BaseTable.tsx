import React from 'react';
import Table, { Size } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export interface ITableProps {
	tableComponent?: {
		stickyHeader?: boolean;
		className?: string;
		size?: Size;
	};
	headCells: { props?: TableCellProps; value?: any }[];
	bodyRows: { cells: { props: TableCellProps; value: any }[] }[];
}

export const BaseTable = (props: ITableProps) => {
	return (
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
					<TableRow key={index}>
						{row.cells.map((cell, index) => (
							<TableCell {...cell.props} key={index}>
								{cell.value}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
