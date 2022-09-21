import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./src/components/Ui/IconButton";

import AllMovements from "./src/screens/AllMovements";
import RecentMovements from "./src/screens/RecentMovements";
import ManageMovement from "./src/screens/ManageMovement";

import MovementsContextProvider from "./src/store/movements-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const MovementsOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#3f51b5" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#3f51b5" },
        tabBarActiveTintColor: "#fff",
        headerRight: ({tintColor}) => (
          <IconButton
            name="add"
            size={26}
            color={tintColor}
            onPress={() => navigation.navigate("Manage")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Recent"
        component={RecentMovements}
        options={{
          title: "Recent Movement",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="All"
        component={AllMovements}
        options={{
          title: "All Movement",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <MovementsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#3f51b5" },
              headerTintColor: "#fff",
              tabBarStyle: { backgroundColor: "#3f51b5" },
            }}
          >
            <Stack.Screen
              name="Overview"
              component={MovementsOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Manage" component={ManageMovement} />
          </Stack.Navigator>
        </NavigationContainer>
      </MovementsContextProvider>
    </>
  );
}
