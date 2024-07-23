import { View, Text, Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useCart } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'


const cart = () => {
  const {items} = useCart();
  return (
    <View style={styles.container} >
      <FlatList  data={items} contentContainerStyle={{padding:10,gap:10}} renderItem={({item})=><CartListItem cartItem={item} />}/>
       {/* Use a light status bar on iOS to account for the black space above the modal */}
       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default cart

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#E4E8E8"
  }
})