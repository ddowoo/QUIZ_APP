import QuizResult from '@/components/screens/quizResult';
import {render} from '@testing-library/react-native';
import {RecoilRoot} from 'recoil';

describe('Home Component Test', () => {
  it('quiz config change btn', () => {
    const {getAllByLabelText} = render(
      <RecoilRoot>
        <QuizResult
          navigation={navigation}
          route={{key: '', name: 'quizResult'}}
        />
      </RecoilRoot>,
    );
  });
});
