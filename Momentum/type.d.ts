import { ReactNode } from "react";

export interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?:"default" | "email-address" | "numeric" | "phone-pad"
    maxLength?: number; 
}

export interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

export interface CreateUserParams {
  email: string,
  password: string,
  name: string
}

export interface SignInParams{
  email: string,
  password: string
}

export interface User {
  id: string,
  name: string,
  email: string
}

export interface TabBarIconProps{
  focused: boolean,
  title: string,
  icon: ReactNode
}

export interface TabBarIconProps {
  focused: boolean,
  title: string,
  icon: keyof typeof MaterialIcons.glyphMap;
}