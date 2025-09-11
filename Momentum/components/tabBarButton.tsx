import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useEffect } from 'react'
import { PlatformPressable } from '@react-navigation/elements'
import { getIconName } from '@/constants/icon'
import { Feather } from '@expo/vector-icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color, 
  label
}
:
{
  onPress:(event: GestureResponderEvent) => void,
  onLongPress:(event: GestureResponderEvent) => void,
  isFocused: boolean,
  routeName:string,
  color:string,
  label:string | ReactNode
}) => {

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
        typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, 
        {duration: 350}
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0,1],[1,0]);

    return {opacity}
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0,1], [1,1.2]);
    const top = interpolate(scale.value, [0,1],[0,12
    ])
    return {
        transform: [{
            scale: scaleValue
        }],
        top
    }
  });

  return (
   <PlatformPressable
        onPressIn={onPress}
        onLongPress={onLongPress}
        style={ styles.tabbarItem }
        android_ripple={null}
        pressColor="transparent"
        >
        {/* <Feather 
            name={getIconName(route.name, isFocused)} 
            size={24} 
            color={isFocused ? '#71b640ff' : '#355ea0ff'}
        /> */}
        <Animated.View style={animatedIconStyle}> 
            <Feather 
            name={getIconName(routeName, isFocused)} 
            size={24} 
            color={isFocused ? '#9FFF9E' : '#232323'}
        />
        </Animated.View>
        <Animated.Text style={[{ color: isFocused ? '#9FFF9E' : '#232323', fontSize:14, fontFamily:'instrumentBold' }, animatedTextStyle]}>
            {label}
        </Animated.Text>
    </PlatformPressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
    
    tabbarItem: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
        
    }
})