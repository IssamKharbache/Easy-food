import { Image, StyleSheet,Pressable } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { Product } from "../types";
import { Link } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container} >
        <Image
          source={{ uri: product.image || "" }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E8E8",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
