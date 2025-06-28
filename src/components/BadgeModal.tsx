import { useEffect, useRef, useState } from "react";
import { League, Season } from "../types/data";
import { searchAllSeasons } from "../services/data.services";
import { retriveItemFromSessionStorage } from "../utils/app.utils";

interface BadgeModalProps {
	league: League;
	onClose: () => void;
}

const SEASON_DATA_CACHE_KEY = "SPORTS_LEAGUE_SEASON";

const BadgeModal = (props: BadgeModalProps) => {
	const { league, onClose } = props;
	const [loading, setLoading] = useState(true);
	const latestSeason = useRef<Season>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener("mousedown", hanldeOutsideClick);
		fetchLatestSeason();
		return () => document.removeEventListener("mousedown", hanldeOutsideClick);
	}, []);

	const fetchLatestSeason = async () => {
		setLoading(true);
		try {
			const cachedSeasonMap = retriveItemFromSessionStorage(
				SEASON_DATA_CACHE_KEY,
				{}
			);
			let season: Season;
			if (cachedSeasonMap[league.idLeague])
				season = cachedSeasonMap[league.idLeague];
			else {
				const res = await searchAllSeasons({
					id: Number(league.idLeague),
					badge: 1,
				});
				season = res.seasons[res.seasons.length - 1];
			}

			latestSeason.current = season;
			sessionStorage.setItem(
				SEASON_DATA_CACHE_KEY,
				JSON.stringify({ ...cachedSeasonMap, [league.idLeague]: season })
			);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const hanldeOutsideClick = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node))
			onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
			ref={modalRef}
		>
			<div className="bg-white p-6 rounded-xl shadow-xl max-w-[calc(100vw)] w-xl">
				<div className="flex items-center justify-between mb-4">
					<span className="font-semibold">
						{league.strLeague}'s Latest Badge
					</span>
					<button
						className=" text-gray-500 hover:text-black text-2xl cursor-pointer"
						aria-label="Close badge modal"
						onClick={onClose}
					>
						&times;
					</button>
				</div>
				<div className="flex justify-center items-center w-full h-[528px] p-2 bg-gray-500">
					{loading ? (
						<span className="animate-spin w-16 h-16 border-4 border-x-white border-y-transparent rounded-[50%]" />
					) : latestSeason.current ? (
						<img
							src={latestSeason.current?.strBadge}
							alt={`${league.strLeague} Badge for season ${latestSeason.current?.strSeason}`}
							className="object-contain w-auto h-auto"
						/>
					) : (
						<span className="text-white">No badge to show</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default BadgeModal;
