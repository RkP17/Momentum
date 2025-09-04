import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'
import clsx from 'clsx'; //manages the conditional classes

const CustomButton = ({
    onPress,
    title ="Click Me",
    style,
    textStyle,
    isLoading = false

}: CustomButtonProps) => {

  return (
    <TouchableOpacity 
        onPress={onPress}
        disabled = {isLoading} // disable the button when loading
        style={[
            {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            paddingHorizontal: 40,
            backgroundColor: '#9FFF9E',
            borderRadius: 30,
            
            },
            style,
        ]}
    >
        {isLoading ? (
        <ActivityIndicator color="#232323" />
      ) : (
        <Text
          style={[
            { color: '#232323', fontSize: 17, textAlign: 'center', fontFamily:'instrumentBold' },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton