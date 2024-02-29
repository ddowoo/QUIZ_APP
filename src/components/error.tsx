import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules

const Error = () => {
  const onPressGoHome = () => {
    RNRestart.restart();
  };

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>실행중 오류가 발생했어요</Text>
      <Text style={styles.text}>서비스를 다시 시작해주세요.</Text>
      <TouchableOpacity onPress={onPressGoHome} style={styles.goHomeBtn}>
        <Text style={styles.goHomeText}>다시 시작</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'gray',
    marginTop: 8,
  },
  goHomeBtn: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#19C084',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  goHomeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
