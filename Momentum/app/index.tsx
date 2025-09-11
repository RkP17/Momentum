import React, { useEffect } from "react";
import Welcome from "./welcome";
import "./global.css"
import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { Platform, SafeAreaView, View } from "react-native";
import changeNavigationBarColor from 'react-native-navigation-bar-color';


export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { user } = useAuthStore();
  


  if (isLoading) return null; // wait for auth check

  

  return isAuthenticated ? <Redirect href="/tabs/home" /> : <Redirect href="/welcome" />;
}
