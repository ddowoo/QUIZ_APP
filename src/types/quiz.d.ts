type QuizCount = 5 | 10 | 15;
type QuizLevel = 'easy' | 'medium' | 'hard';

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: 'multiple';
};
