import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';

import { useCart } from '@/core';
import { Text, TouchableOpacity, View } from '@/ui';

export const FloatingCartButton = () => {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) {
    return null;
  }

  
  const navigateToCart = () => {
    router.push('/cart');
  };

  return (
    <TouchableOpacity 
      className="flex-row items-center rounded-full bg-black p-3"
      onPress={navigateToCart}
    >
      <Ionicons name="cart" size={18} color="white" />

      <View className="absolute -right-2 -top-2 h-6 w-6 items-center justify-center rounded-full bg-red-500">
        <Text className="text-xs font-bold text-white">{itemCount}</Text>
      </View>
    </TouchableOpacity>
  );
};