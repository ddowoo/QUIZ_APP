import {commonStyle} from '@/constants/style';
import {StyleSheet, Text, TouchableOpacityProps, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

type BtnType = 'solid' | 'ghost' | 'disabled';

type Props = {
  text: string;
  type?: BtnType;
  mt?: number;
  mb?: number;
} & TouchableOpacityProps;

const FullWidthButton = ({text, type = 'solid', mt = 0, mb = 0, ...props}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        buttonStyleByType[type],
        {
          marginTop: mt,
          marginBottom: mb,
        },
      ]}
      {...props}>
      <Text style={[styles.text, textStyleByType[type]]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FullWidthButton;

type ButtonStyleByType = Record<BtnType, ViewStyle>;

const buttonStyleByType: ButtonStyleByType = {
  solid: {
    backgroundColor: commonStyle.KEY_COLOR,
  },
  ghost: {
    backgroundColor: commonStyle.WHITE,
    borderColor: commonStyle.KEY_COLOR,
  },
  disabled: {
    backgroundColor: 'gray',
  },
};

type TextStyleByType = Record<BtnType, TextStyle>;

const textStyleByType: TextStyleByType = {
  solid: {color: commonStyle.WHITE},
  ghost: {color: commonStyle.KEY_COLOR},
  disabled: {color: commonStyle.WHITE},
};

const styles = StyleSheet.create({
  btn: {
    width: commonStyle.SCREEN_WIDTH - 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: commonStyle.KEY_COLOR,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
});
