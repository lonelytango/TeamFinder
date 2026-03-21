/** Display label for dedication tags (raw values stay e.g. `1-3` for filters/data). */
export function formatDedicationTag(dedication: string): string {
	switch (dedication) {
		case '1-3':
			return '1–3 hours/wk';
		case '3-10':
			return '3–10 hours/wk';
		case '10-20':
			return '10–20 hours/wk';
		case '20+':
			return '20+ hours/wk';
		default:
			return dedication;
	}
}
