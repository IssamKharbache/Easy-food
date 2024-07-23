import { View, Text, Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useCart } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'


const cartScreen = () => {
  const {items,total} = useCart();
  return (
    <View style={styles.container} >
      <FlatList  data={items} contentContainerStyle={{padding:10,gap:10}} renderItem={({item})=><CartListItem cartItem={item} />}/>
      <Text style={{marginTop:20,fontSize:20,fontWeight:"500"}}>Total: ${total}</Text>
      <Button  text='Checkout'/>
       {/* Use a light status bar on iOS to account for the black space above the modal */}
       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default cartScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#E4E8E8",
    padding:10
  }
})