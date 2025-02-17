export interface QuizData {
    Frontend: Frontend[];
    "metadata-frontend": MetadataFrontend;
    "UI/UX": Frontend[];
}

export interface rQuestions {
    id: string;
    questions: Frontend[];

}

export interface Frontend {
    id: number;
    question: string;
    choices: string[];
    correctAnswer: number;
    difficulty: Difficulty;
    category: Category;
    explanation: string;
    tags?: string[];
}

export enum Category {
    CSS = "CSS",
    HTML = "HTML",
    JavaScript = "JavaScript",
    React = "React",
    TypeScript = "TypeScript",
    UIUX = "UI/UX",
}

export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export interface MetadataFrontend {
    categories: string[];
    difficultyLevels: Difficulty[];
    version: string;
    author: string;
}
