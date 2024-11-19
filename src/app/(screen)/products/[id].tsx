/* eslint-disable max-lines-per-function */
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'

import { useGetIndividualProducts } from '@/api/products/use-get-individual-products'
import { BASE_URL, useCart } from '@/core'
import { type IndividualProductDataResponse, type IndividualProductPageData } from '@/types'
import { Button, Image, Text, View } from '@/ui'

export default function ProductDetailsScreen () {
  const { id } = useLocalSearchParams()
  console.log(id)

  const {data } =  useGetIndividualProducts({
    variables:{
      productId: String(id),
    }
  })


  const extractIndividualProductPageData = (
    data: IndividualProductDataResponse | undefined
  ): IndividualProductPageData | null => {
    if (!data || !data.data) {
      return null; // Handle case where data is undefined or invalid
    }
  
    const { product, productPrices } = data.data;
  
    return {
      defaultPrice: productPrices.defaultPrice,
      productId: product.productId,
      smallImageUrl: BASE_URL + product.smallImageUrl,
      description: product.description,
      productName: product.productName,
      primaryProductCategoryId: product.primaryProductCategoryId,
      isSale: productPrices.isSale,
      largeImageUrl: BASE_URL + product.largeImageUrl,
      currencyUsed: productPrices.currencyUsed,
      listPrice: productPrices.defaultPrice,
    };
  };
  const productData = extractIndividualProductPageData(data);
  const [isExpanded, ] = useState(false)

  const addProduct = useCart((state) => state.addProduct)
  const cartItems = useCart((state) => state.items)
  console.log(cartItems)




  return (
    <View>
      <Text>Product</Text>

      
      <Image
        source={{
          uri: productData?.largeImageUrl,
        }}
        className="aspect-square w-full"
        contentFit="contain"
        transition={1000}
      />
      <View className="p-4">
        <Text className="text-muted-foreground text-sm dark:text-gray-400">{productData?.defaultPrice}</Text>
        <Text className="text-foreground mb-2 text-xl font-bold dark:text-white">{productData?.productName}</Text>

        <View className="mb-4">
          <Text
            className={`text-muted-foreground text-sm dark:text-gray-300 ${isExpanded ? '' : 'line-clamp-2'}`}
            accessibilityLabel={
              isExpanded
                ? 'Full product description'
                : 'Truncated product description'
            }
          >
            {productData?.description }
          </Text>

          {/* { productData?.description.length > 100 && (
            <Pressable
              onPress={toggleDescription}
              accessibilityRole="button"
              accessibilityLabel={
                isExpanded ? 'Collapse description' : 'Expand description'
              }
            >
              <Text className="text-primary mt-1 flex-row items-center text-sm font-semibold dark:text-blue-400">
                {isExpanded ? 'Read less' : 'Read more'}
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="currentColor"
                  style={{ marginLeft: 4 }}
                />
              </Text>
            </Pressable>
          )} */}
        </View>
        <View className="flex justify-between sm:flex-row">
          <Button onPress={() => {
            addProduct(productData as IndividualProductPageData)
          }} variant="default">
            <Text className="text-sm font-semibold text-white dark:text-black">Add to cart</Text>
          </Button>
          <Button variant="outline">
            <Text className="text-primary text-sm font-semibold dark:text-blue-400">Wishlist</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}
