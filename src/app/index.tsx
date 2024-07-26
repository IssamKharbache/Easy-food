import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="Start ordering" />
      </Link>
      <Link href={'/(auth)/sign-in'} asChild>
      <Button text="Sign in" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Text style={{fontWeight:"500" ,textAlign:"center",fontSize:15}}>Log in as admin</Text>
      </Link>
    </View>
  );
};

export default index;