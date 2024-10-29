import { Stack, useLocalSearchParams } from 'expo-router';

import { Button, Image, Text, View } from '@/ui';

import products from '../../../assets/products.json';

export default function ProductDetailsScreen() {


 const { id } = useLocalSearchParams()
 const product = products.find(product => product.id === Number(id))
  
  return (
    <View className="mb-4 w-full flex-1 overflow-hidden rounded-lg bg-white shadow-md">
              <Stack.Screen options={{ title: `${product?.name}`, headerBackTitle: 'Feed' }} />

    <Image
      source={{
        uri: product?.image,
      }}
      className="aspect-square w-full"
      contentFit="contain"
      transition={1000}
    />

    <View className="justify-between p-4">
      <View>
        <Text className="text-sm text-gray-500">{product?.price}</Text>
        <Text className="mb-2 text-sm font-bold">{product?.name}</Text>
      </View>
      <View className="flex items-end justify-end bg-red-500">

          <Button variant="default">
            <Text className="text-sm font-semibold text-white">View</Text>
          </Button>
      </View>
      {/* <Button variant="outline">
          <Text className="text-primary text-sm font-semibold">Wishlist</Text>
        </Button> */}
    </View>
  </View>
  );
}
