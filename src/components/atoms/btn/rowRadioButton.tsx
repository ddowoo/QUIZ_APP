import {commonStyle} from '@/constants/style';
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

type Props = {
  textPos?: 'left' | 'right';
  text: string;
  isChecked: boolean;
  value: string;
  onPress: () => void;
} & TouchableOpacityProps;

const RowRadioButton = ({textPos = 'right', value, text, isChecked, onPress, ...props}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.rowBtnBox} {...props}>
      {textPos === 'left' && <Text>{text}</Text>}
      <RadioButton.Android
        color={commonStyle.KEY_COLOR}
        onPress={onPress}
        status={isChecked ? 'checked' : 'unchecked'}
        value={value}
      />
      {textPos === 'right' && <Text>{text}</Text>}
    </TouchableOpacity>
  );
};

export default RowRadioButton;

const styles = StyleSheet.create({
  rowBtnBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
