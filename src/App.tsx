import { useEffect, useReducer, useRef, useState } from "react";
import BadgeModal from "./components/BadgeModal";
import Header from "./components/Header";
import LeaguesGrid from "./components/LeaguesGrid";
import { getAllLeagues } from "./services/data.services";
import { League } from "./types/data";
import { LeaguesFilter } from "./types/app";
import { filterLeagues, mergeStateReducer } from "./utils/app.utils";
import "./App.css";

function App() {
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useReducer(mergeStateReducer, {
		name: "",
		sport: "",
	} as LeaguesFilter);
	const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
	const leaguesData = useRef<{ leagues: League[]; sports: string[] }>({
		leagues: [],
		sports: [],
	});

	const filteredLeagues = filterLeagues(
		leaguesData.current.leagues,
		filters as LeaguesFilter
	);

	useEffect(() => {
		fetchLeagues();
	}, []);

	const fetchLeagues = async () => {
		setLoading(true);
		try {
			const res = await getAllLeagues();
			leaguesData.current = {
				...res,
				sports: [...new Set(res.leagues.map(({ strSport }) => strSport))],
			};
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const onFilterChange = (filter: Partial<LeaguesFilter>) => setFilters(filter);

	const onLeagueClick = (league: League) => setSelectedLeague(league);

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<span className="animate-spin w-16 h-16 border-4 border-x-black border-y-transparent rounded-[50%]" />
				</div>
			) : (
				<>
					<Header
						sportOptions={leaguesData.current.sports}
						filters={filters}
						onFilterChange={onFilterChange}
					/>
					<LeaguesGrid
						leagues={filteredLeagues}
						onLeagueClick={onLeagueClick}
					/>
					{selectedLeague && (
						<BadgeModal
							league={selectedLeague}
							onClose={() => setSelectedLeague(null)}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default App;
