import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link, router, useRouter} from "expo-router";
import{useFonts}from 'expo-font';
import ExerciseIllustraion from "../assets/images/exercise.svg";
import Animated, { SlideInLeft, ZoomIn } from 'react-native-reanimated';
import { SwipeButton } from 'react-native-expo-swipe-button';
import { MyArrowIcon } from "../components/MyArrowIcon"; // adjust path
import * as WebBrowser from "expo-web-browser";
import AppText from '@/components/AppText';


const Welcome = () => {

    WebBrowser.maybeCompleteAuthSession();

    // width of the slider to fit the screen 
    const screenWidth = Dimensions.get("window").width;
    const router= useRouter();

    

    return (
        <View className="flex-1 justify-start bg-primary px-3.5 pt-20">
        <View className=" justify-start items-center">
            <ExerciseIllustraion width={400} height={400} />
        </View>
        <Animated.Text
            entering={ZoomIn.springify().delay(600)} 
            className="text-3xl text-primary text-left text-light-100"
            style={{ fontFamily: 'instrumentBold' }}
            >Welcome to <AppText className="text-secondary">Momentum</AppText>
        </Animated.Text>
        <Animated.Text 
            entering={ZoomIn.springify().delay(600)} 
            className="text-2xl text-primary text-left text-light-100"
            style={{ fontFamily: 'instrumentBold' }}
            >
            Guiding you to <AppText className="text-secondary">progress,</AppText>
        </Animated.Text>
        <Animated.Text 
            entering={ZoomIn.springify().delay(600)} 
            className="text-2xl text-primary text-left text-secondary"
            style={{ fontFamily: 'instrumentBold' }}
            >
            one <AppText className="text-light-100">habit at a time.</AppText>
        </Animated.Text>
        <View style={{paddingTop:40}}>
            <SwipeButton
            onComplete={() => router.push("/auth/register")}
            title="Ready to Start!"
            titleStyle={{fontFamily: "instrumentBold", fontSize: 25}}
            borderRadius={50}
            containerStyle={{ backgroundColor: 'gray' , width: "100%"}}
            underlayTitle="Release"
            underlayTitleStyle={{ color: 'white' }}
            underlayStyle={{backgroundColor: '#222222ff'}}
            circleSize={70}
            circleBackgroundColor="#9FFF9E"
            Icon={<MyArrowIcon size={50} color="#232323"  />}
            completeThresholdPercentage={50}
            goBackToStart
            width={screenWidth-30}
            
        />
        </View>
        
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
  },
  secondary: {
    color: "#9FFF9E",
  },
  light: {
    color: "#eee",
  },
})