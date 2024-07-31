import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, loading ,isAdmin} = useAuth();
  if (loading) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }
 
  if(!isAdmin){
    return <Redirect href={"/(user)"} />;
  
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="Start ordering" />
      </Link>
      {session ? (
        <Button
          onPress={() => supabase.auth.signOut()}
          text="Sign out"
        ></Button>
      ) : (
        <Link href={"/sign-in"} asChild>
          <Button text="Sign in" />
        </Link>
      )}

      <Link href={"/(admin)"} asChild>
        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 15 }}>
          Log in as admin
        </Text>
      </Link>
    </View>
  );
};

export default index;
