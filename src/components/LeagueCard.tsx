import { League } from "../types/data";

interface LeagueCardProps {
	league: League;
	onClick: (league: League) => void;
}

const LeagueCard = (props: LeagueCardProps) => {
	const { league, onClick } = props;
	const { strLeague, strLeagueAlternate, strSport } = league;
	return (
		<article
			className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
			onClick={() => onClick(league)}
		>
			<h2 className="text-lg font-semibold">{strLeague}</h2>
			<p className="text-sm text-gray-600">{strSport}</p>
			<p className="text-xs text-gray-400">{strLeagueAlternate}</p>
		</article>
	);
};

export default LeagueCard;
