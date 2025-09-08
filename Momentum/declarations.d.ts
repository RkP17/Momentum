declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "react-native-swipe-button" {
  import { ComponentProps } from "react";
  import { ViewStyle, TextStyle } from "react-native";
  import React from "react";

  type SwipeButtonProps = {
    containerStyle?: ViewStyle;
    thumbIconBackgroundColor?: string;
    title?: string;
    titleStyle?: TextStyle;
    onSwipeSuccess: () => void;
    railBackgroundColor?: string;
    railFillBackgroundColor?: string;
    railBorderColor?: string;
  };

  const SwipeButton: React.FC<SwipeButtonProps>;
  export default SwipeButton;
}
