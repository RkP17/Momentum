import { Redirect, Slot } from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {
    const {isAuthenticated} = useAuthStore();

    if (isAuthenticated) return <Redirect href="/tabs/home" />

    return <Slot />
}