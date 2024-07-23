import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const ProductDetailedScreen = () => {
  const {id} = useLocalSearchParams()
    return (
    <View>
      <Stack.Screen options={{title:"Details"}} />
      <Text>ProductDetailedScreen for {id}</Text>
    </View>
  )
}

export default ProductDetailedScreen;