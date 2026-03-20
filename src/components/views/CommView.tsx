import { useState } from 'react';
import type { Team } from '../../types';

interface CommViewProps {
	filteredData: Team[];
	selectedId: number;
	onSelectTeam: (id: number) => void;
}

export default function CommView({ filteredData, selectedId, onSelectTeam }: CommViewProps) {
	const [requestText, setRequestText] = useState('');
	const selectedTeam = filteredData[selectedId] || filteredData[0];

	return (
		<main className="grow">
			<div className="flex border border-black min-h-162.5 bg-white">
				<div className="w-1/3 border-r border-black overflow-y-auto max-h-162.5">
					{filteredData.map((team, i) => (
						<div
							key={i}
							onClick={() => onSelectTeam(i)}
							className={`p-4 border-b border-black cursor-pointer transition-colors ${selectedId === i ? 'bg-[#fffde7]' : 'hover:bg-gray-50'}`}
						>
							<h4 className="font-bold underline text-md leading-tight mb-1">
								{team.title}
							</h4>
							<p className="text-[10px] text-gray-500 italic mb-4">{team.category}</p>
							<p className="text-right text-xs font-bold">John Doe</p>
						</div>
					))}
				</div>
				<div className="w-2/3 p-10 relative">
					{selectedTeam ? (
						<div className="flex flex-col h-full">
							<div className="flex items-center gap-4 mb-8">
								<div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-2xl bg-gray-50">
									👤
								</div>
								<div>
									<h2 className="text-2xl font-bold">John Doe</h2>
									<p className="text-xs text-gray-400">Updated at 3-1-2026</p>
								</div>
							</div>
							<div className="mb-8">
								<h3 className="text-lg font-bold italic mb-3">
									Looking for team member ——————
								</h3>
								<p className="text-gray-800 leading-relaxed">{selectedTeam.content}</p>
							</div>
							<div className="mt-auto border border-black p-4 bg-white">
								<textarea
									className="w-full h-28 outline-none resize-none text-sm placeholder-gray-300"
									placeholder="Reason to Join...."
									value={requestText}
									onChange={(e) => setRequestText(e.target.value.slice(0, 255))}
								/>
								<div className="flex justify-between items-end mt-2">
									<span className="text-[10px] font-mono text-gray-400">
										{requestText.length} / 255
									</span>
									<button className="border border-black px-6 py-1.5 text-sm font-bold hover:bg-black hover:text-white transition-colors cursor-pointer">
										Request To Join
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="flex items-center justify-center h-full text-gray-400 italic">
							Select a team from the list...
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
