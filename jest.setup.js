jest.doMock('recoil', () => require('./node_modules/recoil/native/index'));
jest.doMock('react-native-pie-chart', () =>
  require('./node_modules/react-native-pie-chart/src/index'),
);
