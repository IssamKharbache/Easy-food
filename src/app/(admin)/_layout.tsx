import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme.web';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import Colors from '@/src/constants/Colors';



// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:Colors.light.background,
        tabBarInactiveTintColor:"gainsboro",
        tabBarStyle:{
          backgroundColor:Colors.light.tint
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        <Tabs.Screen name='index' options={{href:null}} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown:false,
          tabBarIcon: ({ color }) => <FontAwesome name="cutlery" size={20}  color={color}/>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={"white"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <FontAwesome name="list-ul" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}