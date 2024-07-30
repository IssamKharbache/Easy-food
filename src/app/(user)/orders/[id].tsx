import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function OrderDetailsScreen(){
    const {id} = useLocalSearchParams();
    const order = orders.find((o)=> o.id.toString() === id);
    if(!order){
        return(
            <Text>Not Found !</Text>
        )
    }
    return (
        <View style={{padding:10}}>
            <Stack.Screen options={{title:`Order #${id}`}} />
            <OrderListItem order={order}/>
        </View>
    )
}