import { useState } from 'react';
import type { Team } from '../types';

interface CommTeamDetailProps {
	team: Team;
}

export default function CommTeamDetail({ team }: CommTeamDetailProps) {
	const [requestText, setRequestText] = useState('');

	return (
		<div className="flex flex-col h-full min-h-0">
			<div className="flex items-center gap-4 mb-8">
				<div className="w-16 h-16 rounded-full border border-black/15 flex items-center justify-center text-2xl bg-gray-50 shadow-md shrink-0">
					👤
				</div>
				<div>
					<h2 className="text-2xl font-bold">{team.author}</h2>
					<p className="text-xs text-gray-400">Updated at 3-1-2026</p>
				</div>
			</div>
			<div className="mb-8">
				<h3 className="text-lg font-bold italic mb-3">{team.title}</h3>
				<p className="text-gray-800 leading-relaxed">{team.content}</p>
			</div>
			<div className="mt-auto rounded-xl border border-black/15 bg-white p-4 shadow-md">
				<textarea
					className="w-full h-28 rounded-lg border border-black/10 px-3 py-2 outline-none resize-none text-sm placeholder-gray-300 shadow-inner"
					placeholder="Reason to Join...."
					value={requestText}
					onChange={(e) => setRequestText(e.target.value.slice(0, 255))}
				/>
				<div className="flex justify-between items-end mt-2">
					<span className="text-[10px] font-mono text-gray-400">
						{requestText.length} / 255
					</span>
					<button
						type="button"
						className="rounded-lg border border-black/20 bg-white px-8 py-3 text-base font-bold shadow-md hover:bg-black hover:text-white hover:shadow-lg transition-all cursor-pointer"
					>
						Request To Join
					</button>
				</div>
			</div>
		</div>
	);
}
