import {ReactNode} from 'react';
import {StatusBar, StyleSheet, View, ViewProps} from 'react-native';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

type SafeBgProps = {
  children: ReactNode;
};

const SafeArea = ({children}: SafeBgProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
