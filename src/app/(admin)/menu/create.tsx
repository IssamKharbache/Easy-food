import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const [image, setImage] = useState<string | null>(null);
  const {id} = useLocalSearchParams();

  const isUpdating = !!id;

  const resetFields = () => {
    setPrice("");
    setTitle("");
  };

  //validate input function
  const validateInput = () => {
    setErrors("");
    if(!title && !price){
      setErrors("Title and price are required");
      return false;
    }
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
   //update product function
   const onUpdate= () => {
    if (!validateInput()) {
      return;
    }
    resetFields();
    console.warn("updating product function")
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

  const onSubmit = () => {
    if(isUpdating){
        onUpdate();
    }else{
        onCreate();
    }
  }
  const onDelete = () => {
    console.warn("Delete function")
   
  }

  const confirmDelete = () =>{
    Alert.alert("Confirm","Are you sure you want to delete this product?",[{
      text: "Cancel",},{
        text:"Delete",
        style:"destructive",
        onPress:onDelete
      }]);

  }
  return (
    <View style={styles.container}>
        <Stack.Screen options={{title:isUpdating ? "Update product":"Create product"}} />
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
      <Text style={{ color: "red", fontWeight: "500",textAlign:"center" }}>
        {errors === "Title and price are required" ? errors : ""}
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
        {errors === "Price is required" && "Price must be a number" ? errors : ""}
      </Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="10$"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button onPress={onSubmit} text={isUpdating ? "Update":"Create"} />
      {
        isUpdating && <Text  onPress={confirmDelete} style={styles.deleteButton}>Delete</Text>
      }
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
    marginBottom:15
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
  },
  image: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    alignSelf: "center",
  },
  deleteButton:{
    backgroundColor: "#c22f1f",
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    textAlign:"center",
    color:"white",
    fontWeight:"500",
    fontSize: 16,
  }

});
export default CreateProductScreen;
