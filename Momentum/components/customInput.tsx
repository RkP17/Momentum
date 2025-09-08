import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomInputProps } from "@/type";
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import clsx from 'clsx'; //manages the conditional classes

const CustomInput = ({ 
    value, 
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType="default"
}: CustomInputProps) => {

    // track the focused or unfocused state of the input
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View className='w-full'>
            <Text 
                className='label'
                style={{
                    fontFamily: "instrumentBold",
                    fontSize: 20,
                    color: "#FFF",
                    marginBottom: 15,
                    marginTop: 30,
                    textAlign: "center",
                }}
                >
                    {label}
                </Text>

            <TextInput
                autoCapitalize='none'
                autoCorrect = {false}
                value = {value}
                onChangeText = {onChangeText}
                secureTextEntry = {secureTextEntry}
                keyboardType = {keyboardType}
                onFocus = {() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={clsx(
                    "w-full h-14 px-3 rounded-full text-white", 
                    isFocused ? "border-2 border-secondary bg-dark-200" : "border border-light-100 bg-dark-200"
                )}
                style = {{
                    fontFamily: "instrumentBold",
                    fontSize: 15,
                    textAlign: "center",
                }}
                
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({})