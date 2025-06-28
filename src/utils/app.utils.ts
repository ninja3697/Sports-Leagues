import { LeaguesFilter } from "../types/app";
import { League } from "../types/data";

export const mergeStateReducer = <T extends Record<string, unknown>>(
	prevState: T,
	updatedProps: Partial<T>
) => ({
	...prevState,
	...updatedProps,
});

export const filterLeagues = (leagues: League[], filter: LeaguesFilter) => {
	return leagues.filter((league) => {
		if (filter.sport && filter.sport !== league.strSport) return false;
		if (
			filter.name &&
			!`${league.strLeague},${league.strLeagueAlternate}`
				.toLowerCase()
				.includes(filter.name.toLowerCase())
		)
			return false;
		return true;
	});
};

export const retriveItemFromSessionStorage = (
	key: string,
	defaultValue?: unknown
) => {
	const val = sessionStorage.getItem(key);
	if (val) return JSON.parse(val);
	return defaultValue;
};
