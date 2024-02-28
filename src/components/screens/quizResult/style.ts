import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  chartBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueBox: {
    width: 200,
    alignSelf: 'center',
  },
  legendBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    alignSelf: 'center',
    marginVertical: 30,
  },
  legendText: {
    fontSize: 16,
    marginRight: 5,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    marginVertical: 6,
    fontWeight: 'bold',
  },
});
