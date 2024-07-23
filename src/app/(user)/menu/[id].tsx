import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const ProductDetailedScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const { id } = useLocalSearchParams();

  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };



  if (!product) {
    return <Text>Product not found !</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />
      <Image source={{ uri: product.image }} style={styles.image} />
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

      <Text style={styles.price}>${product.price}</Text>
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
  price: {
    fontWeight: "bold",
    marginTop: "auto",
    fontSize: 40,
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
