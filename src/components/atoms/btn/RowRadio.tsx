import {StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

type Props = {
  textPos?: 'left' | 'right';
  text: string;
  isChecked: boolean;
  value: string;
  onPress: () => void;
};

const RowRadio = ({
  textPos = 'right',
  value,
  text,
  isChecked,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.rowBtnBox}>
      {textPos === 'left' && <Text>{text}</Text>}
      <RadioButton.Android
        color="#19C084"
        onPress={onPress}
        status={isChecked ? 'checked' : 'unchecked'}
        value={value}
      />
      {textPos === 'right' && <Text>{text}</Text>}
    </TouchableOpacity>
  );
};

export default RowRadio;

const styles = StyleSheet.create({
  rowBtnBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
