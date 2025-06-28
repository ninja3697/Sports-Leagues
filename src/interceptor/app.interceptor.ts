import axios, { AxiosRequestConfig } from "axios";

const _axios = axios.create();

const callAPI = <T>(apiPayload: AxiosRequestConfig): Promise<T> => {
	return new Promise((resolve, reject) => {
		// const payload: AxiosRequestConfig = {
		// 	...apiPayload,
		// 	headers: {
		// 		"Cache-Control": "max-age=300, must-revalidate", // Cache for 5 minutes and revalidate
		// 		...apiPayload.headers,
		// 	},
		// };
		_axios(apiPayload)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};

export default callAPI;
