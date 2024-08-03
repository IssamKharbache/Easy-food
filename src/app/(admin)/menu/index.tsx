

import products from '@/assets/data/products';
import { useProductList } from '@/src/api/products';
import ProductListItem from '@/src/components/ProductListItem';
import { View,FlatList, ActivityIndicator, Text } from 'react-native';





export default function MenuScreen() {
      
  const {data:products,error,isLoading} =  useProductList();
    //loading state
  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to get product , try again..</Text>
  }
  return (
   <View>
    <FlatList  data={products} numColumns={2} contentContainerStyle={{gap:10,padding:10}} columnWrapperStyle={{gap:10}} renderItem={({item})=> <ProductListItem product={item} />} />
   </View>
  );
}
