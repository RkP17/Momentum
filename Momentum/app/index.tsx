import React from "react";
import Welcome from "./welcome";
import "./global.css"
import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { user } = useAuthStore();

  if (isLoading) return null; // wait for auth check

  return isAuthenticated ? <Redirect href="/tabs/home" /> : <Redirect href="/welcome" />;
}
