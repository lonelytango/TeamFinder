import type { Team, FilterState } from '../types';

interface CategoryHorizontalMenuProps {
	data: Team[];
	filters: FilterState;
	onCategoryChange: (category: string) => void;
}

export default function CategoryHorizontalMenu({
	data,
	filters,
	onCategoryChange,
}: CategoryHorizontalMenuProps) {
	const categories = Array.from(new Set(data.map((d) => d.category)));

	return (
		<nav
			className="rounded-xl border border-black/15 bg-white p-4 mb-4 shadow-md"
			aria-label="Project categories"
		>
			<h2 className="font-bold text-sm mb-3 uppercase tracking-tight">Project Category</h2>
			<div className="flex flex-wrap gap-2 items-center">
				{categories.map((cat) => {
					const count = data.filter((d) => d.category === cat).length;
					const active = filters.category === cat;
					return (
						<button
							key={cat}
							type="button"
							onClick={() => onCategoryChange(active ? '' : cat)}
							className={`rounded-lg border border-black/15 px-3 py-1.5 text-xs font-bold shadow-sm cursor-pointer transition-all hover:shadow-md ${
								active ? 'bg-yellow-100' : 'bg-white hover:bg-gray-50'
							}`}
						>
							<span>{cat}</span>
							<span className="ml-1.5 tabular-nums text-gray-600">{count}</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
}
