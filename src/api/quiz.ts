import {quizAxios} from './axiosInstance';

type GetQuizListReturn = Question[];

export const getQuestionListFetch = async (
  quizCount: QuizCount,
  quizLevel: QuizLevel,
): Promise<GetQuizListReturn> => {
  try {
    const params = {
      amount: quizCount,
      difficulty: quizLevel,
      type: 'multiple',
    };
    const res = await quizAxios.get<{
      response_code: number;
      results: GetQuizListReturn;
    }>('', {params});

    return res.data.results;
  } catch (error) {
    throw error;
  }
};
