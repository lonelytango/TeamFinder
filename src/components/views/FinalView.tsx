import { useState } from 'react';
import type { Team } from '../../types';
import { formatDedicationTag } from '../../utils/dedication';
import JoinRequestModal from '../JoinRequestModal';
import VacancyBadge from '../VacancyBadge';

interface FinalViewProps {
	filteredData: Team[];
}

type TagKind = 'category' | 'timezone' | 'availability' | 'role' | 'dedication';

interface TagItem {
	text: string;
	kind: TagKind;
}

const KIND_CLASSES: Record<Exclude<TagKind, 'category'>, string> = {
	timezone: 'bg-sky-100 border-sky-900 text-sky-950',
	availability: 'bg-emerald-100 border-emerald-900 text-emerald-950',
	role: 'bg-violet-100 border-violet-900 text-violet-950',
	dedication: 'bg-amber-100 border-amber-900 text-amber-950',
};

const CATEGORY_PALETTE = [
	'bg-rose-100 border-rose-900 text-rose-950',
	'bg-cyan-100 border-cyan-900 text-cyan-950',
	'bg-fuchsia-100 border-fuchsia-900 text-fuchsia-950',
	'bg-lime-100 border-lime-900 text-lime-950',
	'bg-orange-100 border-orange-900 text-orange-950',
	'bg-indigo-100 border-indigo-900 text-indigo-950',
	'bg-teal-100 border-teal-900 text-teal-950',
	'bg-pink-100 border-pink-900 text-pink-950',
];

function categoryClasses(category: string): string {
	let h = 0;
	for (let i = 0; i < category.length; i++) {
		h = (h * 31 + category.charCodeAt(i)) >>> 0;
	}
	return CATEGORY_PALETTE[h % CATEGORY_PALETTE.length];
}

function teamTags(team: Team): TagItem[] {
	return [
		{ text: team.category, kind: 'category' },
		{ text: team.timezone, kind: 'timezone' },
		{ text: team.availability, kind: 'availability' },
		...team.role.map((r) => ({ text: r, kind: 'role' as const })),
		{ text: formatDedicationTag(team.dedication), kind: 'dedication' },
	];
}

function tagClass(kind: TagKind, text: string): string {
	const base =
		kind === 'dedication'
			? 'border px-2.5 py-1 text-[10px] font-bold normal-case tracking-tight rounded-md shadow-sm'
			: 'border px-2.5 py-1 text-[10px] font-bold uppercase rounded-md shadow-sm';
	if (kind === 'category') {
		return `${base} ${categoryClasses(text)}`;
	}
	return `${base} ${KIND_CLASSES[kind]}`;
}

export default function FinalView({ filteredData }: FinalViewProps) {
	const [modalTeam, setModalTeam] = useState<Team | null>(null);

	return (
		<main className="grow w-full min-w-0">
			{modalTeam && (
				<JoinRequestModal
					key={modalTeam.content}
					team={modalTeam}
					onClose={() => setModalTeam(null)}
				/>
			)}
			<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-5">
				{filteredData.map((team, i) => (
					<div
						key={i}
						className="rounded-xl border border-black/15 bg-white p-5 shadow-lg flex flex-col min-h-[24.2rem]"
					>
						<div className="flex justify-between items-start gap-3 mb-3">
							<h3 className="text-xl font-bold min-w-0 line-clamp-2">{team.title}</h3>
							<VacancyBadge team={team} />
						</div>
						<p className="text-base text-gray-600 grow border-t border-gray-100 pt-3 italic leading-relaxed">
							{team.content.substring(0, 140)}...
						</p>

						<div className="flex flex-wrap gap-2 mb-4 mt-4">
							{teamTags(team).map((tag, idx) => (
								<div key={`${tag.kind}-${tag.text}-${idx}`} className={tagClass(tag.kind, tag.text)}>
									{tag.text}
								</div>
							))}
						</div>

						<div className="flex justify-between items-center border-t border-gray-100 pt-3">
							<span className="text-sm font-medium">{team.author}</span>
							<button
								type="button"
								onClick={() => setModalTeam(team)}
								className="bg-[#fff9c4] border border-black/20 px-6 py-2.5 text-sm font-bold rounded-lg shadow-md hover:bg-[#fff59d] hover:shadow-lg transition-all cursor-pointer"
							>
								Request To Join
							</button>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
