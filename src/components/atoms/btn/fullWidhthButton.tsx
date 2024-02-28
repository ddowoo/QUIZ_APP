import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('screen');
const KEY_COLOR = '#19C084';

type BtnType = 'solid' | 'ghost' | 'disabled';

type Props = {
  text: string;
  type?: BtnType;
  mt?: number;
  mb?: number;
} & TouchableOpacityProps;

const FullWidthButton = ({
  text,
  type = 'solid',
  mt = 0,
  mb = 0,
  ...props
}: Props) => {
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
    backgroundColor: KEY_COLOR,
  },
  ghost: {
    backgroundColor: '#fff',
    borderColor: KEY_COLOR,
  },
  disabled: {
    backgroundColor: 'gray',
  },
};

type TextStyleByType = Record<BtnType, TextStyle>;

const textStyleByType: TextStyleByType = {
  solid: {color: '#fff'},
  ghost: {color: KEY_COLOR},
  disabled: {color: '#fff'},
};

const styles = StyleSheet.create({
  btn: {
    width: screenWidth - 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: KEY_COLOR,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
});
