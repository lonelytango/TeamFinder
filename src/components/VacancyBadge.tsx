import type { Team } from '../types';

export default function VacancyBadge({ team }: { team: Team }) {
	return (
		<span className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-xs font-bold shadow-sm shrink-0 whitespace-nowrap">
			[{team.filled}/{team.teamSize}] ppl found
		</span>
	);
}
