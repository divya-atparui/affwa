/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { FloatingCartButton } from '@/components/ui/floating-cart-button';
import { useAuth, useIsFirstTime } from '@/core';
import { View } from '@/ui';
import { Settings as SettingsIcon } from '@/ui/icons';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'black',
        tabBarStyle: { height: 60, paddingBottom: 10 },
        headerRight: () => (
          <View className='pr-4'>

            <FloatingCartButton />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),

          tabBarTestID: 'feed-tab',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
         <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color }) =>  <AntDesign name="shoppingcart" size={24} color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

// const CreateNewPostLink = () => {
//   return (
//     <Link href="/feed/add-post" asChild>
//       <Pressable>
//         <Text className="px-3 text-primary-300">Create</Text>
//       </Pressable>
//     </Link>
//   );
// };
