export enum DifficultLevels {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export type Course = {
    id: string;
    author_id: string;
    category_id: string;
    title: string;
    description: string;
    cover_description: string;
    cover_image: string;
    creation_date: string;
    duration: string;
    is_visible: boolean;
    difficulty_level: DifficultLevels;
    rating: number;
};

