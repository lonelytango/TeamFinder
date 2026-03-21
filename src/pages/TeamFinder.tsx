import { useState, useMemo } from 'react';
import rawData from '../assets/sample.json';
import type { Team, FilterState } from '../types';
import { INITIAL_FILTERS } from '../types';
import { Filters, FinalView, CategoryHorizontalMenu } from '../components';

export default function TeamFinder() {
	const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

	const handleClearAll = () => setFilters(INITIAL_FILTERS);

	const filteredData = useMemo(() => {
		return (rawData as Team[]).filter((item) => {
			return (
				(!filters.timezone || item.timezone === filters.timezone) &&
				(!filters.availability || item.availability === filters.availability) &&
				(!filters.grade || item.grade === filters.grade) &&
				(!filters.dedication || item.dedication === filters.dedication) &&
				(!filters.category || item.category === filters.category) &&
				(!filters.role || item.role.includes(filters.role))
			);
		});
	}, [filters]);

	return (
		<div className="min-h-screen bg-[#f3f3f3] p-6 text-black font-sans">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold tracking-tight md:text-4xl">Team Finder</h1>
				<div className="text-sm font-bold tracking-tight">
					Showing {filteredData.length} teams
				</div>
			</div>

			<CategoryHorizontalMenu
				data={rawData as Team[]}
				filters={filters}
				onCategoryChange={(category) => setFilters((prev) => ({ ...prev, category }))}
			/>

			<Filters
				activeFilters={filters}
				onFilterChange={(k, v) => setFilters((prev) => ({ ...prev, [k]: v }))}
				onClearAll={handleClearAll}
			/>

			<FinalView filteredData={filteredData} />
		</div>
	);
}
