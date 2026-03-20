import type { Team } from '../../types';

interface GridViewProps {
	filteredData: Team[];
}

export default function GridView({ filteredData }: GridViewProps) {
	return (
		<main className="grow">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredData.map((team, i) => (
					<div
						key={i}
						className="border border-black p-4 bg-white flex flex-col min-h-80"
					>
						<h3 className="text-xl font-bold mb-3">Looking for a team</h3>
						<p className="text-sm text-gray-600 grow border-t border-gray-100 pt-3 italic">
							{team.content.substring(0, 140)}...
						</p>

						<div className="flex flex-wrap gap-2 mb-4 mt-4">
							{[team.timezone, team.availability, ...team.role, team.dedication].map(
								(tag, idx) => (
									<div
										key={idx}
										className="border border-black px-2 py-0.5 text-[10px] font-bold bg-gray-50 uppercase"
									>
										{tag}
									</div>
								)
							)}
						</div>

						<div className="flex justify-between items-center border-t border-gray-100 pt-3">
							<span className="text-sm font-medium">John Doe</span>
							<button className="bg-[#fff9c4] border border-black px-3 py-1 text-xs font-bold hover:bg-[#fff59d] transition-colors cursor-pointer">
								Request To Join
							</button>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
