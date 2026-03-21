/**
 * Vector logo (no raster image): search + small team network inside the lens.
 */
interface TeamFinderLogoProps {
	className?: string;
}

export default function TeamFinderLogo({ className = 'h-full w-full' }: TeamFinderLogoProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
		>
			{/* Lens */}
			<circle
				cx="18"
				cy="18"
				r="13"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			{/* Handle */}
			<path
				d="M 28 28 L 41 41"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
			{/* Team triangle — connections */}
			<path
				d="M 18 13.5 L 14 20.5 L 22 20.5 Z"
				stroke="currentColor"
				strokeWidth="1.25"
				strokeLinejoin="round"
				fill="none"
				opacity="0.85"
			/>
			{/* Three nodes */}
			<circle cx="18" cy="13.5" r="2.75" fill="#fff9c4" stroke="currentColor" strokeWidth="1.25" />
			<circle cx="14" cy="20.5" r="2.75" fill="#fff9c4" stroke="currentColor" strokeWidth="1.25" />
			<circle cx="22" cy="20.5" r="2.75" fill="#fff9c4" stroke="currentColor" strokeWidth="1.25" />
		</svg>
	);
}
