import { useState } from 'react';
import type { FilterState } from '../types';

const FILTER_CONFIG = [
	{ label: 'Time Zone', key: 'timezone', options: ['CST', 'EST', 'PST', 'Others'] },
	{
		label: 'Availability',
		key: 'availability',
		options: ['After work hours', 'All hours', 'Weekday', 'Weekend'],
	},
	{ label: 'Aim grade', key: 'grade', options: ['A', 'B or better', 'C or better'] },
	{
		label: 'Project Role',
		key: 'role',
		options: ['backend', 'designer', 'frontend', 'project management'],
	},
	{ label: 'Dedication', key: 'dedication', options: ['1-3', '3-10', '10-20', '20+'] },
];

interface FiltersProps {
	activeFilters: FilterState;
	onFilterChange: (key: string, value: string) => void;
	onClearAll: () => void;
}

export default function Filters({ onFilterChange, onClearAll, activeFilters }: FiltersProps) {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const hasActiveFilters = Object.values(activeFilters).some((v) => v !== '');

	return (
		<div className="flex items-center gap-4 border border-black p-4 bg-white mb-4 relative z-50">
			{FILTER_CONFIG.map((config) => (
				<div key={config.key} className="relative">
					<button
						onClick={() => setOpenDropdown(openDropdown === config.key ? null : config.key)}
						className={`flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-50 border ${activeFilters[config.key as keyof FilterState] ? 'border-black bg-yellow-50' : 'border-transparent'}`}
					>
						<span className="font-medium text-md">{config.label}</span>
						<span className="text-[10px]">▼</span>
					</button>

					{openDropdown === config.key && (
						<div className="absolute top-full left-0 mt-1 w-48 border border-black bg-white shadow-md">
							<div
								className="p-2 hover:bg-gray-100 cursor-pointer text-xs italic text-gray-400 border-b border-gray-100"
								onClick={() => {
									onFilterChange(config.key, '');
									setOpenDropdown(null);
								}}
							>
								Clear this filter
							</div>
							{config.options.map((opt) => (
								<div
									key={opt}
									onClick={() => {
										onFilterChange(config.key, opt);
										setOpenDropdown(null);
									}}
									className={`p-2 hover:bg-yellow-100 cursor-pointer text-sm ${activeFilters[config.key as keyof FilterState] === opt ? 'bg-yellow-200 font-bold' : ''}`}
								>
									{opt}
								</div>
							))}
						</div>
					)}
				</div>
			))}

			{hasActiveFilters && (
				<button
					onClick={onClearAll}
					className="ml-auto text-xs font-bold text-red-600 underline cursor-pointer hover:text-red-800"
				>
					CLEAR ALL FILTERS
				</button>
			)}
		</div>
	);
}
