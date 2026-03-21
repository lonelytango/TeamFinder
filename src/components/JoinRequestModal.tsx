import { useEffect } from 'react';
import type { Team } from '../types';
import CommTeamDetail from './CommTeamDetail';

interface JoinRequestModalProps {
	team: Team;
	onClose: () => void;
}

export default function JoinRequestModal({ team, onClose }: JoinRequestModalProps) {
	useEffect(() => {
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	}, []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="join-request-modal-title"
		>
			<button
				type="button"
				className="absolute inset-0 bg-black/50 cursor-default"
				onClick={onClose}
				aria-label="Close dialog"
			/>
			<div
				className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-black/15 bg-white p-8 md:p-10 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg border border-black/15 bg-white text-lg font-bold leading-none shadow-md hover:bg-gray-100 cursor-pointer"
					aria-label="Close"
				>
					×
				</button>
				<h2 id="join-request-modal-title" className="sr-only">
					{team.title}
				</h2>
				<CommTeamDetail team={team} />
			</div>
		</div>
	);
}
