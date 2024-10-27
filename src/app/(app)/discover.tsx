import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, } from 'react-native';

import {Text, View } from '@/ui';
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max 270 React',
    description: "Men's Shoe",
    price: 'INR 150',
    image: 'https://example.com/placeholder.png',
  },
  {
    id: '2',
    name: 'Adidas Classic Leather',
    description: 'Unisex Originals',
    price: 'INR 80',
    image: 'https://example.com/placeholder.png',
  },
  {
    id: '3',
    name: 'Converse Chuck Taylor',
    description: 'Unisex High Top',
    price: 'INR 55',
    image: 'https://example.com/placeholder.png',
  },
  {
    id: '4',
    name: 'Vans Old Skool',
    description: 'Classic Skate Shoe',
    price: 'INR 60',
    image: 'https://example.com/placeholder.png',
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <View className="mb-4 w-[48%]">
    <Image
      source={{ uri: product.image }}
      className="mb-2 aspect-square w-full rounded-lg"
      contentFit="cover"
      transition={1000}
    />
    <Text className="text-sm font-bold">{product.name}</Text>
    <Text className="text-xs text-gray-600">{product.description}</Text>
    <Text className="mt-1 text-sm font-bold">{product.price}</Text>
  </View>
);

const DiscoverScreen = () => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-bold">Discover</Text>
        <Link href="/(app)/discover">
          <Text className="text-blue-500">View All</Text>
        </Link>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default DiscoverScreen;