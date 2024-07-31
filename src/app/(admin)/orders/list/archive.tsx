import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { FlatList, Text } from "react-native";


export default function OrdersScreen(){
    return(
       <FlatList data={orders}  renderItem={({item})=><OrderListItem order={item} />} contentContainerStyle={{padding:10,gap:10}}/>
    )
}