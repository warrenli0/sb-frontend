export interface UserProfile {
    _id: string;
    email: string;
    username: string;
    photo: string;
}

export interface Module {
    _id: string;
    title: string;
    author: string;
    category: string;
    difficulty: string;
    description: string;
    questins: Question[];
    estimated_time: string;
}

export interface Question {
    _id: string;
    type: string;
    title: string;
    author: string;
    category: string;
    difficulty: string;
    problemStatement: string;
    answerChoices: Answer[];
    has_img: boolean;
    img_link: string;
    passage: string;
    explanation: string;
}

export interface Answer {
    _id: string;
    text: string;
    isCorrect: boolean;
}

export interface Post {
    _id: string;
    title: string;
    created_by: string;
    created_at: string;
    content: string;
    comments: Comment[];
}

export interface Comment {
    _id: string;
    created_by: string;
    created_at: string;
    text: string;
}