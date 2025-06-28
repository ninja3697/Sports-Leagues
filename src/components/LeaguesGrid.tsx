import { League } from "../types/data";
import LeagueCard from "./LeagueCard";

interface LeagueProps {
	leagues: League[];
	onLeagueClick: (League: League) => void;
}

const LeaguesGrid = (props: LeagueProps) => {
	const { leagues, onLeagueClick } = props;

	if (leagues.length === 0) {
		return (
			<div className="text-black text-xl font-semibold p-4">
				No leagues to show
			</div>
		);
	}

	return (
		<main className="max-w-6xl mx-auto p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{leagues.map((league) => (
				<LeagueCard
					key={league.idLeague}
					league={league}
					onClick={onLeagueClick}
				/>
			))}
		</main>
	);
};

export default LeaguesGrid;
