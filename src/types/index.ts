export type ViewMode = 'vacancy' | 'grid' | 'comm';

export interface Team {
	timezone: string;
	availability: string;
	dedication: string;
	grade: string;
	role: string[];
	category: string;
	title: string;
	content: string;
}

export interface FilterState {
	timezone: string;
	availability: string;
	grade: string;
	role: string;
	dedication: string;
	category: string;
}

export const INITIAL_FILTERS: FilterState = {
	timezone: '',
	availability: '',
	grade: '',
	role: '',
	dedication: '',
	category: '',
};
