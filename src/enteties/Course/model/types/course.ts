export enum DifficultLevels {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export type Course = {
	id: string;
	title: string;
	description: string;
	cover_description: string;
	cover_image: string;
	creation_date: string;
	duration: string;
	category_id: string;
	isVisible: boolean;
	author_id: string;
	difficulty_level: DifficultLevels | string;
	rating: number;
};
