import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams} from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";
import { defaultImage } from "@/assets/data/products";

const ProductDetailedScreen = () => {
  const { id: idString } = useLocalSearchParams();

  if(idString === undefined){
    return;
  }
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const {data:product,error,isLoading} = useProduct(id);
  if (!product) {
    return <Text>Product not found !</Text>;
  }
  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to get product , try again..</Text>
  }
  return (
    <View style={styles.container}>
       <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: "Details" }} />
      <Image source={{ uri: product.image || defaultImage}} style={styles.image} />
      <Text style={styles.price}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E8E8",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign:"center",
    marginTop:35,
    textTransform:"capitalize"
  },

  sizes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
