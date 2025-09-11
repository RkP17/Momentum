import { View, Platform, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import TabBarButton from './tabBarButton';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const  [dimensions, setDimensions] = useState({height: 20, width: 100});

  const buttonWidth =  dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
    })
  }
  const tabPositionX = useSharedValue(0);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}]
    }
  })
  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View 
        style={[animatedStyle,{
          position: 'absolute',
          backgroundColor: '#232323',
          borderRadius: 50,
          marginHorizontal: 12,
          height: dimensions.height - 15,
          width: buttonWidth - 25,
        }]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index , {duration: 1300})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getIconName = (routeName: string, focused: boolean) => {
          switch (routeName) {
            case 'home':
              return 'home';
            case 'stats':
              return 'bar-chart-2';
            case 'settings':
              return 'settings';
            default:
              return 'home';
          }
        };

        return (
            <TabBarButton 
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName= {route.name}
                color= {isFocused ? '#71b640ff' : '#355ea0ff'}
                label={String(label)}
            />
        //   <PlatformPressable
        //     key={route.key}
        //     href={buildHref(route.name, route.params)}
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarButtonTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     style={ styles.tabbarItem }
        //   >
        //     <Feather 
        //       name={getIconName(route.name, isFocused)} 
        //       size={24} 
        //       color={isFocused ? '#71b640ff' : '#355ea0ff'}
        //     />
        //     {icon[route.name]({
        //          color: isFocused ? '#71b640ff' : '#355ea0ff' 
        //      })}
        //     <Text style={{ color: isFocused ? '#71b640ff' : '#355ea0ff' }}>
        //       {label}
        //     </Text>
        //   </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 30,
        left: 10, // Shift it more to the left
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#9FFF9E',
        paddingVertical: 14,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
        shadowOpacity: 0.3,
        elevation: 10,
        width: 300,

    },

    // tabbarItem: {
    //     flex:1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     gap: 5
    // }
})