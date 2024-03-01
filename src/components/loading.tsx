import {commonStyle} from '@/constants/style';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.bg}>
      <ActivityIndicator color={commonStyle.KEY_COLOR} />
      <Text style={styles.text}>잠시만 기다려주세요...🙏</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'gray',
    marginTop: 20,
  },
});

export default Loading;
