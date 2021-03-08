import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import Search from "../pages/Search";
import Favorite from "../pages/Favorite";
import Repos from "../pages/Repos";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Search: {
    lib: FontAwesome,
    name: "search",
  },
  Favorite: {
    lib: FontAwesome,
    name: "heart",
  },
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: "#F5F5F5",
          borderTopColor: "#F5F5F5",
        },
        activeTintColor: "#000",
        inactiveTintColor: "#CFCFD6",
      }}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Repos" component={Repos} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
