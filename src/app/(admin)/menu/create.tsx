import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAddProduct, useDeleteProduct, useProduct, useUpdateProduct } from "@/src/api/products";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [isDeleting,setIsDeleting] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const {id:idString} = useLocalSearchParams();
  if(idString === undefined){
    return;
  }
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const router = useRouter();

  const isUpdating = !!id;

  const {mutate:addProduct} = useAddProduct();
  const {mutate:updateProduct} = useUpdateProduct();
  const {mutate:deleteProduct} = useDeleteProduct();
  const {data:updatingInfo} = useProduct(id);
  

  useEffect(()=>{
   if(updatingInfo){
    setName(updatingInfo.name);
    setPrice(updatingInfo.price.toString());
    setImage(updatingInfo.image);
   }
  },[updatingInfo])

  const resetFields = () => {
    setPrice("");
    setName("");
  };

  //validate input function
  const validateInput = () => {
    setErrors("");
    if(!name && !price){
      setErrors("Title and price are required");
      return false;
    }
    if (!name) {
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
    addProduct({name,price:parseFloat(price),image},{
      onSuccess:()=>{
        resetFields();
        router.push("/(admin)");
      }
    })
   
   
  };
   //update product function
   const onUpdate= () => {
    if (!validateInput()) {
      return;
    }
    updateProduct({
      id,name,price:parseFloat(price),image,
    },{
      onSuccess:()=>{
        resetFields();
        router.push("/(admin)");
      }
    })
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
    setIsDeleting(true);
    deleteProduct(id,{onSuccess:() => {
      router.push("/(admin)");
      setIsDeleting(false);
    },onError:()=>{
      setIsDeleting(false);
    }});
   
  }

  const confirmDelete = () =>{
    Alert.alert("Confirm","Are you sure you want to delete this product?",[{
      text: "Cancel",},{
        text:"Delete",
        style:"destructive",
        onPress:onDelete
      }]);

  }
  if(isDeleting){
    return (
      <View style={styles.deletingContainer}>
        <Text style={styles.deleteMsg}>Deleting product please wait...</Text>
            <ActivityIndicator size="large" color="red" />
      </View>
    )
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
        value={name}
        onChangeText={setName}
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
  },
  deletingContainer:{
    margin:"auto"
  },
  deleteMsg:{
    fontSize:20,
    color:"red",
    marginBottom:25
    
  }

});
export default CreateProductScreen;
