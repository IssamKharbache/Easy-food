import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

const CreateProductScreen = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const [image, setImage] = useState<string | null>(null);

  const resetFields = () => {
    setPrice("");
    setTitle("");
  };

  //validate function
  const validateInput = () => {
    setErrors("");
    if (!title) {
      setErrors("Title is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }

    return true;
  };

  //create new product function
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    resetFields();
  };

  //pick image function
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
        <Stack.Screen options={{title:"Create Product"}} />
      <Image
        source={{
          uri:
            image ||
            "https://static.vecteezy.com/system/resources/previews/015/337/675/non_2x/transparent-upload-icon-free-png.png",
        }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Product image
      </Text>
      <Text style={styles.label}>Product title</Text>
      <Text style={{ color: "red", fontWeight: "500" }}>
        {errors === "Title is required" ? errors : ""}
      </Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />

      <Text style={styles.label}>Product price</Text>
      <Text style={{ color: "red", fontWeight: "500" }}>
        {errors === "Price is required" ? errors : ""}
      </Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="10$"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    padding: 7,
    backgroundColor: "#E4E8E8",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "#081040",
    fontSize: 15,
    marginVertical: 10,
    marginBottom: 35,
  },

  label: {
    color: "gray",
    fontSize: 16,
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    alignSelf: "center",
  },
});
export default CreateProductScreen;
