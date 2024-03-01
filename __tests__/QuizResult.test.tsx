import QuizResult from '@/components/screens/quizResult';
import {render} from '@testing-library/react-native';
import {TestStack, wrapStackScreen} from '@/utils/testHelper';

describe('Home Component Test', () => {
  it('quiz config change btn', () => {
    const children = <TestStack.Screen component={QuizResult} name="quizResult" />;

    render(wrapStackScreen({children}));
  });
});
