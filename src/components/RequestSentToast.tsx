import { useEffect, useLayoutEffect, useState } from 'react';
import { Portal, Transition } from '@headlessui/react';
import { PaperPlaneTilt } from '@phosphor-icons/react';

interface RequestSentToastProps {
	message: string | null;
	onDismiss: () => void;
}

/** Visible duration before fade-out (ms). */
const VISIBLE_MS = 2000;

export default function RequestSentToast({ message, onDismiss }: RequestSentToastProps) {
	const [show, setShow] = useState(false);

	useLayoutEffect(() => {
		if (message) setShow(true);
	}, [message]);

	useEffect(() => {
		if (!message) {
			setShow(false);
			return;
		}
		const t = window.setTimeout(() => setShow(false), VISIBLE_MS);
		return () => window.clearTimeout(t);
	}, [message]);

	return (
		<Portal>
			<Transition
				show={show}
				afterLeave={onDismiss}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 -translate-y-3"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-[2000ms]"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="pointer-events-none fixed inset-0 z-9999 flex items-start justify-center pt-10 sm:pt-12">
					{message ? (
						<div
							role="status"
							aria-live="polite"
							className="pointer-events-auto mx-4 flex max-w-[min(90vw,28rem)] items-center gap-3 rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-bold text-black shadow-2xl"
						>
							<PaperPlaneTilt
								className="h-7 w-7 shrink-0 text-emerald-700"
								weight="duotone"
								aria-hidden
							/>
							<span>{message}</span>
						</div>
					) : null}
				</div>
			</Transition>
		</Portal>
	);
}
