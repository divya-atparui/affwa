import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

import ProductListItems from '@/components/product-list-items';
import { images } from '@/core';
import { Image, Text, View } from '@/ui';

import products from '../../../assets/products.json';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}


const categories: Category[] = [
  { id: '1', name: 'Sneakers', icon: 'directions-run' },
  { id: '2', name: 'Boots', icon: 'hiking' },
  { id: '3', name: 'Sandals', icon: 'beach-access' },
  { id: '4', name: 'Dress Shoes', icon: 'business-center' },
  { id: '5', name: 'Slippers', icon: 'house' },
];

const carouselItems = [
  { id: '1', image: images.exit, title: 'Summer Sale' },
  { id: '2', image: 'https://example.com/banner2.png', title: 'New Arrivals' },
  {
    id: '3',
    image: 'https://example.com/banner3.png',
    title: 'Limited Edition',
  },
];

const CategoryItem = ({ category }: { category: Category }) => (
  <View className="mr-4 items-center">
    <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-gray-200">
      <MaterialIcons name={category.icon} size={24} color="black" />
    </View>
    <Text className="text-xs">{category.name}</Text>
  </View>
);

const CarouselItem = ({ item }: { item: (typeof carouselItems)[0] }) => (
  <View className="h-40 w-full overflow-hidden rounded-lg">
    <Image source={images.exit} className="h-full w-full" contentFit="cover" />

    <View className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2">
      <Text className="font-bold text-white">{item.title}</Text>
    </View>
  </View>
);

const ProductList = () => (
  <FlatList
    data={products}
    renderItem={({ item }) => <ProductListItems product={item} />}
    keyExtractor={(item) => item.name + item.id}
    numColumns={2}
    contentContainerClassName="gap-2"
    columnWrapperClassName="gap-2"
  />
);

export default function Home() {
  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1">
        <View className="mx-1 mt-10 h-48 p-3">
          <Swiper autoplay autoplayTimeout={3000} showsPagination={false} loop>
            {carouselItems.map((item) => (
              <CarouselItem key={item.id} item={item} />
            ))}
          </Swiper>
        </View>

        <View className="mt-6">
          <Text className="mb-4 px-4 text-lg font-bold">Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>

        <View className="flex-row items-center justify-between p-4">
          <Text className="text-2xl font-bold">Discover</Text>
          <Link href="/product/12">
            <Text className="text-blue-500">View All</Text>
          </Link>
        </View>
        <ProductList />
      </ScrollView>
    </View>
  );
}
