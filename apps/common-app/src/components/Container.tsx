/* eslint-disable react-native/no-inline-styles */
import type { PropsWithChildren, FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  centered?: boolean;
}>;

const Container: FC<ContainerProps> = (props) => {
  const { children, style, centered } = props;
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 8,
        },
        centered && { justifyContent: 'center', alignItems: 'center' },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;
