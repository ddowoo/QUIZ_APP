import QuizResult from '@/components/screens/quizResult';
import {RootStackParams} from '@/navigations/rootScreens';
import {StackNavigationProp} from '@react-navigation/stack';
import {render} from '@testing-library/react-native';
import {RecoilRoot} from 'recoil';

const navigation: StackNavigationProp<RootStackParams, 'quizResult'> = {
  goBack: jest.fn(),
  getId: jest.fn(),
  removeListener: jest.fn(),
  addListener: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  canGoBack: jest.fn(),
  navigate: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  dispatch: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
};
/**
 * QuizResult 컴포넌트 내부 react-native-pie-chart SyntaxError: Unexpected token 'export' 에러
 * 시도 조치
 * transformIgnorePatterns 추가
 * jest.setup.js
 */
describe('Home Component Test', () => {
  it('quiz config change btn', () => {
    // const {getAllByLabelText} = render(
    //   <RecoilRoot>
    //     <QuizResult
    //       navigation={navigation}
    //       route={{key: '', name: 'quizResult'}}
    //     />
    //   </RecoilRoot>,
    // );
  });
});
