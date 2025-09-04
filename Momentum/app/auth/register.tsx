import { Image, Alert, StyleSheet, Text, View , Keyboard, TouchableWithoutFeedback, Button, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import React from 'react'
import{useFonts}from 'expo-font';
import AppText from '@/components/AppText';
import CustomInput from '@/components/customInput';
import CustomButton from '@/components/CustomButton';
import { useState, useEffect } from 'react';
import { account, signInWithGoogle } from '@/lib/appwrite';
import * as Linking from "expo-linking";
import { OAuthProvider } from 'appwrite';
import * as Google from 'expo-auth-session/providers/google';
import { Link, router, useRouter } from "expo-router";
import GoogleButton from "../../assets/images/google-button.svg";
import GoogleIcon from "../../assets/images/google-icon.svg";
import { createUser } from '@/lib/appwrite';
import useAuthStore from '@/store/auth.store';
import { User } from '@/type';
import { makeRedirectUri } from 'expo-auth-session';



const Register = () => {
    const router = useRouter();
    // Set the state of loading 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const submit = async () => {
        const { name, email, password } = form;

        if (!name || !email || !password) return Alert.alert ('Error','Please fill in all fields of the form correctly' );

        setIsSubmitting(true);

        // re route the page to the home page 
        try {
            const userData = await createUser({
                email,
                password,
                name
            })
            const setUser = useAuthStore.getState().setUser;
            setUser(userData as unknown as User);

            router.replace("/tabs/home");
        } catch(error){
            Alert.alert('Error', error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }

    // @ts-ignore
    const redirectUri = makeRedirectUri({ useProxy: true });

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "390879470559-n9b1gcdebokcq5ktjdt1t3bimd375bg8.apps.googleusercontent.com",
        redirectUri,
        scopes: ["profile", "email"],         // Ask for profile info and email
        
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;

            if (!authentication?.accessToken) return;

            async function loginOrRegisterWithGoogle() {
            try {
                if (authentication?.accessToken) {
                const userData = await signInWithGoogle(authentication.accessToken);
                useAuthStore.getState().setUser(userData as unknown as User); // update Zustand
                router.replace("/tabs/home"); // navigate to home
            } else {
                throw new Error("Authentication failed: accessToken is null");
            }
            } catch (error) {
                Alert.alert(
                "Google Sign Up Failed",
                error instanceof Error ? error.message : "Unknown error"
                );
            }
            }

            loginOrRegisterWithGoogle();
        }
    }, [response]);


  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height' }
        style={{backgroundColor:"#232323", flex:1}}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
            <View
                className='flex-1 justify-start bg-primary px-3.5 pt-20 font-instrumentBold'
                >
                <AppText className='text-center text-3xl text-light-100  text-secondary'>First <AppText className='text-light-100'>Step. Register.</AppText></AppText>
                <View className='mt-1'>
                    <CustomInput
                        value ={form.name}
                        onChangeText={(text) => setForm((prev) => ({...prev, name:text}))}
                        label='Name'
                        keyboardType='default'
                    />
                    <CustomInput
                        value ={form.email}
                        onChangeText={(text) => setForm((prev) => ({...prev, email:text}))}
                        label='Email'
                        keyboardType='email-address'
                    />
                    <CustomInput
                        value ={form.password}
                        onChangeText={(text) => setForm((prev) => ({...prev, password:text}))}
                        label='Password'
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View> 
                <View className='mt-10'>
                    <CustomButton
                        title = "Lets Go !"
                        isLoading = {isSubmitting}
                        onPress={submit}
                    />
                
                </View>
                
                <View className='flex-1 items-center mt-5'>
                    <AppText style={{ color:"#ffffffff", fontSize:20}}>OR</AppText>
                    <View style={{ width: "100%" , marginTop:20}}>
                        <TouchableOpacity
                            onPress={() => promptAsync()}
                            disabled={!request}
                            style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent:"center", padding: 15, borderRadius: 50, backgroundColor: "#ffffffff" }}
                            >
                            <GoogleIcon width={40} height={30}/>
                            <Text style={{ color: "#000000ff", fontFamily: "instrumentBold", marginLeft: 10, fontSize:16 }}>Sign up with Google</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row justify-center items-center mt-16'>
                        <Text className='flex text-light-100 justify-center'>
                            Already have an account?
                        </Text>
                        <Link href="/auth/signIn" className='base-bold text-secondary' style={{fontWeight:"600"}}> Sign in</Link>
                    </View>
                </View>
                
                    
            
            </View>
        </ScrollView>
            
        </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
    
    
  )
}

export default Register

const styles = StyleSheet.create({
});