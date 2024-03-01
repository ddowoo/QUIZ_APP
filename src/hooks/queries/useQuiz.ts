import {useQuery} from 'react-query';
import {getQuestionListFetch} from '../../api/quiz';

export const useQuiz = (count: QuizCount, level: QuizLevel) => {
  const quizQuery = useQuery(['quiz'], () => getQuestionListFetch(count, level), {
    staleTime: Infinity,
    suspense: true,
    useErrorBoundary: true,
  });

  return quizQuery;
};
