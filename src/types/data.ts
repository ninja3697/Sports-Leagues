export type League = {
	idLeague: string;
	strLeague: string;
	strSport: string;
	strLeagueAlternate: string;
};

export type GetAllLeaguesResponse = {
	leagues: League[];
};

export type Season = {
	strSeason: string;
	strPoster?: string;
	strBadge?: string;
};

export type SearchAllSeasonsRequest = {
	id: number;
	poster?: number;
	badge?: number;
};

export type SearchAllSeasonsResponse = {
	seasons: Season[];
};
