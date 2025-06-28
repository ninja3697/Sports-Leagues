import callAPI from "../interceptor/app.interceptor";
import {
	GetAllLeaguesResponse,
	SearchAllSeasonsRequest,
	SearchAllSeasonsResponse,
} from "../types/data";

const SERVICE_BASE_URL = "https://www.thesportsdb.com/api/v1/json/3/";

export const getAllLeagues = (): Promise<GetAllLeaguesResponse> => {
	const apiPayload = {
		method: "GET",
		url: `${SERVICE_BASE_URL}all_leagues.php`,
	};
	return callAPI<GetAllLeaguesResponse>(apiPayload);
};

export const searchAllSeasons = (
	params: SearchAllSeasonsRequest
): Promise<SearchAllSeasonsResponse> => {
	const apiPayload = {
		method: "GET",
		url: `${SERVICE_BASE_URL}search_all_seasons.php`,
		params,
	};
	return callAPI<SearchAllSeasonsResponse>(apiPayload);
};
