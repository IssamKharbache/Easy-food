import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { Product } from "../types";

type ProductListItemProps = {
    product: Product
}

const ProductListItem = ({product}:ProductListItemProps) => {

  
    return(
      <View style={styles.container}>
      <Image source={{uri:product.image || ""}} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
    )
  }


  export default ProductListItem;


  
const styles = StyleSheet.create({
    container: {
     backgroundColor:"white",
     padding:10,
     borderRadius:20
    },
    price:{
       color:Colors.light.tint,
       fontWeight:"600"
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginVertical:10
    },
    image:{
      width:"100%",
      aspectRatio:1
  
    }
  
  });
  