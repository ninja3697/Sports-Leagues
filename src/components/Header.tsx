import { LeaguesFilter } from "../types/app";

interface HeaderProps {
	sportOptions: Array<string>;
	filters: LeaguesFilter;
	onFilterChange: (filter: Partial<LeaguesFilter>) => void;
}

const Header = (props: HeaderProps) => {
	const { sportOptions, filters, onFilterChange } = props;

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.trim();
		onFilterChange({ name: searchValue });
	};

	const onSportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onFilterChange({ sport: e.target.value });
	};

	return (
		<header className="bg-white shadow p-4 sticky top-0 z-10">
			<div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
				<h1 className="text-2xl font-bold">Sports Leagues</h1>
				<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<input
						type="text"
						placeholder="Search by league name..."
						value={filters.name}
						onChange={onNameChange}
						className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
					/>
					<select
						className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
						value={filters.sport}
						onChange={onSportSelect}
					>
						<option value="">All Sports</option>
						{sportOptions.map((sport) => (
							<option key={sport} value={sport}>
								{sport}
							</option>
						))}
					</select>
				</div>
			</div>
		</header>
	);
};

export default Header;
