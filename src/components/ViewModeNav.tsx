import type { ViewMode } from '../types';

interface ViewModeNavProps {
	view: ViewMode;
	onViewChange: (view: ViewMode) => void;
}

const VIEW_MODES: ViewMode[] = ['vacancy', 'grid', 'comm'];

export default function ViewModeNav({ view, onViewChange }: ViewModeNavProps) {
	return (
		<div className="flex border border-black bg-white">
			{VIEW_MODES.map((m) => (
				<button
					key={m}
					onClick={() => onViewChange(m)}
					className={`px-4 py-2 text-xs font-bold uppercase tracking-tighter border-r last:border-r-0 border-black cursor-pointer ${view === m ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
				>
					{m === 'comm' ? 'Comm View' : `${m} view`}
				</button>
			))}
		</div>
	);
}
