import type { Team, FilterState } from '../../types';
import CategorySidebar from '../CategorySidebar';

interface VacancyViewProps {
	filteredData: Team[];
	allData: Team[];
	filters: FilterState;
	onCategoryChange: (category: string) => void;
}

export default function VacancyView({
	filteredData,
	allData,
	filters,
	onCategoryChange,
}: VacancyViewProps) {
	return (
		<div className="flex gap-6">
			<CategorySidebar data={allData} filters={filters} onCategoryChange={onCategoryChange} />
			<main className="grow">
				<div className="flex flex-col border-t border-black">
					{filteredData.length > 0 ? (
						filteredData.map((_, i) => (
							<div
								key={i}
								className="border border-t-0 border-black p-4 bg-white flex justify-between items-center"
							>
								<div>
									<h3 className="text-lg font-bold">Looking for a team</h3>
									<div className="flex gap-4 items-center mt-1">
										<span className="border border-black px-2 py-0.5 text-xs font-bold">
											[2/4] ppl found
										</span>
										<span className="text-sm">John Doe</span>
									</div>
								</div>
								<button className="border border-black px-8 py-2 font-bold hover:bg-gray-100 cursor-pointer">
									Join
								</button>
							</div>
						))
					) : (
						<div className="p-10 text-center bg-white border border-t-0 border-black italic text-gray-400">
							No teams match your filters.
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
