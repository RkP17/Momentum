import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppText from '@/components/AppText'
import { getCurrentUser } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'

const Home = () => {
  const user = useAuthStore((state: { user: any }) => state.user);
  
  return (
    
    <View className="flex-1 justify-start bg-primary px-3.5 pt-20">
      <AppText className='text-3xl text-light-100' >Hi <AppText className='text-secondary'>{user?.name ? user.name : 'there'} !</AppText></AppText>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})