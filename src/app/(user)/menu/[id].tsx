import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import { defaultImage } from "@/assets/data/products";

const ProductDetailedScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();

  const { id: idString } = useLocalSearchParams();

  if(idString === undefined){
    return;
  }
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const {data:product,error,isLoading} = useProduct(id);

  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

  const router = useRouter();

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to get product , try again..</Text>
  }
  if (!product) {
    return <Text>Product not found !</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />
      <Image source={{ uri: product.image || defaultImage}} style={styles.image} />
      <Text style={{ fontWeight: "500", fontSize: 20 }}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size, idx) => (
          <Pressable
            onPress={() =>{
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === size ? "gainsboro" : "#E4E8E8",
              },
            ]}
            key={idx}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
   <View style={styles.info}>
   <Text style={styles.name}>{product.name}</Text>
   <Text style={styles.price}>${product.price}</Text>
   </View>
      <Button text="Add to cart" onPress={addToCart} />
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
  info:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginTop:"auto",
    marginBottom:"auto",
    padding:25
  },
  name:{
    fontWeight: "bold",
    fontSize: 25,
    textTransform:"capitalize",

  },
  price: {
    fontWeight: "bold",
    fontSize: 30,
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
