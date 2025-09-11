import { Redirect, Slot, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";
import React, { useEffect } from "react";
import { TabBar } from "@/components/TabBar";



export default function TabLayout() {
    const {isAuthenticated, user} = useAuthStore();
    
    if (!isAuthenticated) return <Redirect href="/welcome" />

    return <Tabs tabBar= {(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle: {
                    display: 'none',
                    position: 'absolute',
                    bottom: -100, // Move it off-screen
                    height: 0,
                }
            }}
        >
        <Tabs.Screen name='home' options ={{title: "Habits"}} />
        <Tabs.Screen name='stats' options ={{title: "Stats"}} />
        <Tabs.Screen name='settings' options ={{title: "Settings"}} />
    </Tabs>
}