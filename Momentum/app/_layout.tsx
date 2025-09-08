import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/auth.store";

SplashScreen.preventAutoHideAsync(); // keep splash until ready

export default function RootLayout() {
  const{isLoading, fetchAuthenticatedUser} = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "instrumentBold": require("../assets/fonts/InstrumentSans-Bold.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync(); // hide splash only when fonts are ready
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser()
  },[]);

  

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType) => {
      const url = event.url;
      console.log("Deep link URL:", url);

      if (url.includes("momentum://onboarding")) {
        router.replace("/onboarding");
      } else if (url.includes("momentum://register")) {
        router.replace("/auth/register"); 
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  if (!fontsLoaded || isLoading) return null; 



  return (
    <GestureHandlerRootView className="flex-1 bg-app">
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  )

    
}

