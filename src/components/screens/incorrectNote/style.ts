import {commonStyle} from '@/constants/style';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  emptyBg: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'gray',
  },
  questionPage: {
    width: commonStyle.SCREEN_WIDTH,
    padding: 20,
    flex: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionBtn: {
    marginVertical: 5,
  },

  correct: {
    color: commonStyle.KEY_COLOR,
  },
  incorrect: {
    color: commonStyle.SUB_COLOR,
  },
  goBackBtn: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: commonStyle.KEY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  goBackText: {
    color: commonStyle.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  delBtn: {
    backgroundColor: commonStyle.SUB_COLOR,
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 10,
  },
  delText: {
    color: commonStyle.WHITE,
  },
});
