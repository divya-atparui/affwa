import { Link } from 'expo-router';
import React from 'react';

import { Button, Image, Text, View } from '@/ui';

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <View className="mb-4 flex h-[300px] w-full flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <Image
        source={{
          uri: product.image,
        }}
        className="aspect-square h-48 w-full"
        contentFit="contain"
        transition={1000}
      />

      <View className="flex flex-1 flex-col justify-between p-4">
        <View className="flex-1">
          <Text className="text-sm text-gray-500">{product.price}</Text>
          <Text className="mb-2 line-clamp-2 text-sm font-extralight">{product.name}</Text>
        </View>
        <View className="mt-2">
          <Link href={`/product/${product.id}`} asChild>
            <Button variant="default" className="w-full">
              <Text className="text-sm font-semibold text-white">View</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}