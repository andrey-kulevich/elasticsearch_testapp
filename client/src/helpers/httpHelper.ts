import axios, { AxiosResponse, Method } from 'axios';

export const httpHelper = async (
	url: string,
	method: Method,
	//token: string | null,
	body: any = null,
): Promise<AxiosResponse> => {
	const headers: Record<string, string> = {};
	//headers['Authorization'] = `Basic ${token}`;
	if (body) {
		body = JSON.stringify(body);
		headers['Content-Type'] = 'application/json;charset=utf-8';
	}

	return axios({
		method: method,
		url: `${process.env.REACT_APP_DEV_URL}${url}`,
		data: body,
		headers: headers,
	});
};
