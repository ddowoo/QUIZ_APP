import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('screen');

type Props = {
  text: string;
} & TouchableOpacityProps;

const FullWidthButton = ({text, ...props}: Props) => {
  return (
    <TouchableOpacity style={styles.startBtn} {...props}>
      <Text style={styles.startBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FullWidthButton;

const styles = StyleSheet.create({
  startBtn: {
    width: screenWidth - 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19C084',
    color: '#fff',
  },
  startBtnText: {
    color: '#fff',
  },
});
