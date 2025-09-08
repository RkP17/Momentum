import { Redirect, Slot } from "expo-router";
import useAuthStore from "@/store/auth.store";
import { useEffect } from "react";
import fetchAuthenticatedUser from "../../store/auth.store";

export default function TabLayout() {
    const {isAuthenticated, user} = useAuthStore();
    
    if (!isAuthenticated) return <Redirect href="/welcome" />

    return <Slot />
}