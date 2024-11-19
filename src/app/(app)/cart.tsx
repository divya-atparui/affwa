import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity,View } from 'react-native';

import { useCart } from '@/core';
import { type CartItem } from '@/types';

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart();

  const total = items.reduce((sum, item) => sum + item.product.defaultPrice * item.quantity, 0);

  const renderCartItem = (item: CartItem) => (

    <View key={item.product.productId} className="mx-4 mb-2 mt-4 flex-row items-center rounded-lg bg-white p-4">
      <Image
        source={{ uri: item.product.smallImageUrl }}
        className="h-20 w-20 rounded-md"
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold">{item.product.productName}</Text>
        <Text className="text-gray-600">Rs.{item.product.defaultPrice.toFixed(2)}</Text>
        <View className="mt-2 flex-row items-center">
          <TouchableOpacity
            onPress={() => updateQuantity(item.product.productId, item.quantity - 1)}
            className="rounded-full bg-gray-200 p-2"
          >
            <AntDesign name="minus" size={16} color="#4B5563" />
          </TouchableOpacity>
          <Text className="mx-4 text-lg">{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.product.productId, item.quantity + 1)}
            className="rounded-full bg-gray-200 p-2"
          >
            <AntDesign name="plus" size={16} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeItem(item.product.productId)}
            className="ml-auto rounded-full bg-red-500 p-2"
          >
            <AntDesign name="delete" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    
    <View className="mt-10 flex-1 bg-gray-100">

      <ScrollView className="flex-1">
        {items.map(renderCartItem)}
      </ScrollView>

      <View className="bg-white p-4 shadow-lg">
        <Text className="mb-2 text-xl font-bold">Total: Rs.{total.toFixed(2)}</Text>
        <TouchableOpacity className="rounded-lg bg-blue-500 p-4">
          <Text className="text-center text-lg font-semibold text-white">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}