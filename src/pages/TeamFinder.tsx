import { useState, useMemo } from 'react';
import rawData from '../assets/sample.json';

// --- Types ---
type ViewMode = 'vacancy' | 'grid' | 'comm';

interface Team {
	timezone: string;
	availability: string;
	dedication: string;
	grade: string;
	role: string[];
	category: string;
	title: string;
	content: string;
}

// --- Sub-Components ---

const Filters = ({
	onFilterChange,
	onClearAll,
	activeFilters,
}: {
	onFilterChange: (key: string, value: string) => void;
	onClearAll: () => void;
	activeFilters: Record<string, string>;
}) => {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const filterConfig = [
		{
			label: 'Time Zone',
			key: 'timezone',
			options: ['CST', 'EST', 'PST', 'Others'],
		},
		{
			label: 'Availability',
			key: 'availability',
			options: ['After work hours', 'All hours', 'Weekday', 'Weekend'],
		},
		{
			label: 'Aim grade',
			key: 'grade',
			options: ['A', 'B or better', 'C or better'],
		},
		{
			label: 'Project Role',
			key: 'role',
			options: ['backend', 'designer', 'frontend', 'project management'],
		},
		{
			label: 'Dedication',
			key: 'dedication',
			options: ['1-3', '3-10', '10-20', '20+'],
		},
	];

	const hasActiveFilters = Object.values(activeFilters).some((v) => v !== '');

	return (
		<div className='flex items-center gap-4 border border-black p-4 bg-white mb-4 relative z-50'>
			{filterConfig.map((config) => (
				<div key={config.key} className='relative'>
					<button
						onClick={() =>
							setOpenDropdown(openDropdown === config.key ? null : config.key)
						}
						className={`flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-50 border ${activeFilters[config.key] ? 'border-black bg-yellow-50' : 'border-transparent'}`}
					>
						<span className='font-medium text-md'>{config.label}</span>
						<span className='text-[10px]'>▼</span>
					</button>

					{openDropdown === config.key && (
						<div className='absolute top-full left-0 mt-1 w-48 border border-black bg-white shadow-md'>
							<div
								className='p-2 hover:bg-gray-100 cursor-pointer text-xs italic text-gray-400 border-b border-gray-100'
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
									className={`p-2 hover:bg-yellow-100 cursor-pointer text-sm ${activeFilters[config.key] === opt ? 'bg-yellow-200 font-bold' : ''}`}
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
					className='ml-auto text-xs font-bold text-red-600 underline cursor-pointer hover:text-red-800'
				>
					CLEAR ALL FILTERS
				</button>
			)}
		</div>
	);
};

// --- Main Application ---

const TeamFinder = () => {
	const [view, setView] = useState<ViewMode>('vacancy');
	const [selectedId, setSelectedId] = useState<number>(0);
	const [requestText, setRequestText] = useState('');
	const initialFilters = {
		timezone: '',
		availability: '',
		grade: '',
		role: '',
		dedication: '',
		category: '',
	};
	const [filters, setFilters] =
		useState<Record<string, string>>(initialFilters);

	const handleClearAll = () => setFilters(initialFilters);

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

	const selectedTeam = filteredData[selectedId] || filteredData[0];

	return (
		<div className='min-h-screen bg-[#f3f3f3] p-6 text-black font-sans'>
			{/* Header Navigation */}
			<div className='flex justify-between items-center mb-6'>
				<div className='flex border border-black bg-white'>
					{(['vacancy', 'grid', 'comm'] as ViewMode[]).map((m) => (
						<button
							key={m}
							onClick={() => {
								setView(m);
								setSelectedId(0);
							}}
							className={`px-4 py-2 text-xs font-bold uppercase tracking-tighter border-r last:border-r-0 border-black cursor-pointer ${view === m ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
						>
							{m === 'comm' ? 'Comm View' : `${m} view`}
						</button>
					))}
				</div>
				<div className='text-sm font-bold tracking-tight'>
					Showing {filteredData.length} teams
				</div>
			</div>

			<Filters
				activeFilters={filters}
				onFilterChange={(k, v) => setFilters((prev) => ({ ...prev, [k]: v }))}
				onClearAll={handleClearAll}
			/>

			<div className='flex gap-6'>
				{/* Sidebar for Vacancy View */}
				{view === 'vacancy' && (
					<aside className='w-72 border border-black p-4 bg-white h-fit'>
						<h2 className='font-bold text-lg mb-4'>Project Category</h2>
						<div className='space-y-3 text-sm'>
							{Array.from(new Set(rawData.map((d) => d.category))).map(
								(cat) => (
									<div
										key={cat}
										onClick={() =>
											setFilters((prev) => ({
												...prev,
												category: prev.category === cat ? '' : cat,
											}))
										}
										className={`flex justify-between items-start group cursor-pointer p-1 ${filters.category === cat ? 'bg-yellow-100 font-bold' : ''}`}
									>
										<span className='group-hover:underline text-gray-700'>
											├─ {cat}
										</span>
										<span className='font-bold ml-2'>
											{rawData.filter((d) => d.category === cat).length}
										</span>
									</div>
								),
							)}
						</div>
					</aside>
				)}

				<main className='grow'>
					{/* Vacancy List View */}
					{view === 'vacancy' && (
						<div className='flex flex-col border-t border-black'>
							{filteredData.length > 0 ? (
								filteredData.map((_, i) => (
									<div
										key={i}
										className='border border-t-0 border-black p-4 bg-white flex justify-between items-center'
									>
										<div>
											<h3 className='text-lg font-bold'>Looking for a team</h3>
											<div className='flex gap-4 items-center mt-1'>
												<span className='border border-black px-2 py-0.5 text-xs font-bold'>
													[2/4] ppl found
												</span>
												<span className='text-sm'>John Doe</span>
											</div>
										</div>
										<button className='border border-black px-8 py-2 font-bold hover:bg-gray-100 cursor-pointer'>
											Join
										</button>
									</div>
								))
							) : (
								<div className='p-10 text-center bg-white border border-t-0 border-black italic text-gray-400'>
									No teams match your filters.
								</div>
							)}
						</div>
					)}

					{/* Grid View */}
					{view === 'grid' && (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{filteredData.map((team, i) => (
								<div
									key={i}
									className='border border-black p-4 bg-white flex flex-col min-h-80'
								>
									<h3 className='text-xl font-bold mb-3'>Looking for a team</h3>
									<p className='text-sm text-gray-600 grow border-t border-gray-100 pt-3 italic'>
										{team.content.substring(0, 140)}...
									</p>

									{/* Updated Tags Section: Displays the criteria under the object */}
									<div className='flex flex-wrap gap-2 mb-4 mt-4'>
										{[
											team.timezone,
											team.availability,
											...team.role,
											team.dedication,
										].map((tag, idx) => (
											<div
												key={idx}
												className='border border-black px-2 py-0.5 text-[10px] font-bold bg-gray-50 uppercase'
											>
												{tag}
											</div>
										))}
									</div>

									<div className='flex justify-between items-center border-t border-gray-100 pt-3'>
										<span className='text-sm font-medium'>John Doe</span>
										<button className='bg-[#fff9c4] border border-black px-3 py-1 text-xs font-bold hover:bg-[#fff59d] transition-colors cursor-pointer'>
											Request To Join
										</button>
									</div>
								</div>
							))}
						</div>
					)}

					{/* Communication View */}
					{view === 'comm' && (
						<div className='flex border border-black min-h-162.5 bg-white'>
							<div className='w-1/3 border-r border-black overflow-y-auto max-h-162.5'>
								{filteredData.map((team, i) => (
									<div
										key={i}
										onClick={() => setSelectedId(i)}
										className={`p-4 border-b border-black cursor-pointer transition-colors ${selectedId === i ? 'bg-[#fffde7]' : 'hover:bg-gray-50'}`}
									>
										<h4 className='font-bold underline text-md leading-tight mb-1'>
											{team.title}
										</h4>
										<p className='text-[10px] text-gray-500 italic mb-4'>
											{team.category}
										</p>
										<p className='text-right text-xs font-bold'>John Doe</p>
									</div>
								))}
							</div>
							<div className='w-2/3 p-10 relative'>
								{selectedTeam ? (
									<div className='flex flex-col h-full'>
										<div className='flex items-center gap-4 mb-8'>
											<div className='w-16 h-16 rounded-full border border-black flex items-center justify-center text-2xl bg-gray-50'>
												👤
											</div>
											<div>
												<h2 className='text-2xl font-bold'>John Doe</h2>
												<p className='text-xs text-gray-400'>
													Updated at 3-1-2026
												</p>
											</div>
										</div>
										<div className='mb-8'>
											<h3 className='text-lg font-bold italic mb-3'>
												Looking for team member ——————
											</h3>
											<p className='text-gray-800 leading-relaxed'>
												{selectedTeam.content}
											</p>
										</div>
										<div className='mt-auto border border-black p-4 bg-white'>
											<textarea
												className='w-full h-28 outline-none resize-none text-sm placeholder-gray-300'
												placeholder='Reason to Join....'
												value={requestText}
												onChange={(e) =>
													setRequestText(e.target.value.slice(0, 255))
												}
											/>
											<div className='flex justify-between items-end mt-2'>
												<span className='text-[10px] font-mono text-gray-400'>
													{requestText.length} / 255
												</span>
												<button className='border border-black px-6 py-1.5 text-sm font-bold hover:bg-black hover:text-white transition-colors cursor-pointer'>
													Request To Join
												</button>
											</div>
										</div>
									</div>
								) : (
									<div className='flex items-center justify-center h-full text-gray-400 italic'>
										Select a team from the list...
									</div>
								)}
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default TeamFinder;