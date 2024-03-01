import {quizAxios} from './axiosInstance';

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export type QuestionItem = Question & {optionList: string[]};

export const getQuestionListFetch = async (
  count: QuizCount,
  level: QuizLevel,
): Promise<QuestionItem[]> => {
  try {
    console.log('퀴즈 불러오기');

    const params = {
      amount: count,
      difficulty: level,
      type: 'multiple',
    };

    const res = await quizAxios.get<{
      response_code: number;
      results: Question[];
    }>('', {params});

    return res.data.results.map(question => {
      const {correct_answer, incorrect_answers} = question;

      return {
        ...question,
        optionList: shuffle([correct_answer, ...incorrect_answers]),
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
