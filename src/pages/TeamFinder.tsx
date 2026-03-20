import { useState, useMemo } from 'react';
import rawData from '../assets/sample.json';
import type { Team, ViewMode, FilterState } from '../types';
import { INITIAL_FILTERS } from '../types';
import {
	Filters,
	ViewModeNav,
	VacancyView,
	GridView,
	CommView,
} from '../components';

export default function TeamFinder() {
	const [view, setView] = useState<ViewMode>('vacancy');
	const [selectedId, setSelectedId] = useState<number>(0);
	const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

	const handleViewChange = (newView: ViewMode) => {
		setView(newView);
		setSelectedId(0);
	};

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
			{/* Header Navigation */}
			<div className="flex justify-between items-center mb-6">
				<ViewModeNav view={view} onViewChange={handleViewChange} />
				<div className="text-sm font-bold tracking-tight">
					Showing {filteredData.length} teams
				</div>
			</div>

			<Filters
				activeFilters={filters}
				onFilterChange={(k, v) => setFilters((prev) => ({ ...prev, [k]: v }))}
				onClearAll={handleClearAll}
			/>

			<div className="flex gap-6">
				{view === 'vacancy' && (
					<VacancyView
						filteredData={filteredData}
						allData={rawData as Team[]}
						filters={filters}
						onCategoryChange={(category) =>
							setFilters((prev) => ({ ...prev, category }))
						}
					/>
				)}
				{view === 'grid' && <GridView filteredData={filteredData} />}
				{view === 'comm' && (
					<CommView
						filteredData={filteredData}
						selectedId={selectedId}
						onSelectTeam={setSelectedId}
					/>
				)}
			</div>
		</div>
	);
}
