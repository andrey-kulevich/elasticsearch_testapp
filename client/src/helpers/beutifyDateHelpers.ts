export const dateReformat = (date: string): string => {
	if (date) {
		const temp = date.split('-');
		return `${temp[2]}.${temp[1]}.${temp[0]}`;
	} else return '';
};

export const dateTimeReformat = (dateTime: string): string => {
	if (dateTime) {
		const separated = dateTime.split('T');
		const dateSeparated = separated[0].split('-');
		return `${dateSeparated[2]}.${dateSeparated[1]}.${dateSeparated[0]}, ${separated[1].slice(0, 8)}`;
	} else return '';
};
