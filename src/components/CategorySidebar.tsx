import type { Team, FilterState } from '../types';

interface CategorySidebarProps {
	data: Team[];
	filters: FilterState;
	onCategoryChange: (category: string) => void;
}

export default function CategorySidebar({ data, filters, onCategoryChange }: CategorySidebarProps) {
	const categories = Array.from(new Set(data.map((d) => d.category)));

	return (
		<aside className="w-72 border border-black p-4 bg-white h-fit">
			<h2 className="font-bold text-lg mb-4">Project Category</h2>
			<div className="space-y-3 text-sm">
				{categories.map((cat) => (
					<div
						key={cat}
						onClick={() => onCategoryChange(filters.category === cat ? '' : cat)}
						className={`flex justify-between items-start group cursor-pointer p-1 ${filters.category === cat ? 'bg-yellow-100 font-bold' : ''}`}
					>
						<span className="group-hover:underline text-gray-700">├─ {cat}</span>
						<span className="font-bold ml-2">{data.filter((d) => d.category === cat).length}</span>
					</div>
				))}
			</div>
		</aside>
	);
}
