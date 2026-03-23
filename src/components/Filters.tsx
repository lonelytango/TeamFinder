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
		<div className="flex items-center gap-4 rounded-xl border border-black/15 bg-white p-4 mb-4 shadow-md relative z-50">
			{FILTER_CONFIG.map((config) => {
				const selected = activeFilters[config.key as keyof FilterState];
				return (
				<div key={config.key} className="relative">
					<button
						type="button"
						onClick={() => setOpenDropdown(openDropdown === config.key ? null : config.key)}
						className={`flex min-w-0 max-w-sm items-center gap-2 rounded-lg border px-3 py-1.5 text-sm shadow-sm cursor-pointer transition-shadow hover:bg-gray-50 hover:shadow-md ${selected ? 'border-black/25 bg-yellow-50' : 'border-black/10 bg-white'}`}
					>
						<span className="shrink-0 font-medium text-md">{config.label}</span>
						{selected ? (
							<>
								<span className="shrink-0 text-gray-400" aria-hidden>
									·
								</span>
								<span
									className="min-w-0 max-w-48 truncate font-semibold text-gray-900"
									title={selected}
								>
									{selected}
								</span>
							</>
						) : null}
						<span className="shrink-0 text-[10px]">▼</span>
					</button>

					{openDropdown === config.key && (
						<div className="absolute top-full left-0 z-10 mt-1 w-48 overflow-hidden rounded-lg border border-black/15 bg-white shadow-lg">
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
				);
			})}

			{hasActiveFilters && (
				<button
					type="button"
					onClick={onClearAll}
					className="ml-auto rounded-lg px-2 py-1 text-xs font-bold text-red-600 underline shadow-sm cursor-pointer hover:bg-red-50 hover:text-red-800 hover:shadow-md"
				>
					CLEAR ALL FILTERS
				</button>
			)}
		</div>
	);
}
