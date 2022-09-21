import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import MovementsOutput from "./MovementsOutput";
import ManageMovement from "../screens/ManageMovement";

import { getFormatDate } from "../utility/date";

const MovementsList = ({ data }) => {
  console.log(data);
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => {
        item.id;
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Manage", { movId: item.id })}
          >
            <View style={styles.movement}>
              <View>
                <Text style={styles.description}>{item.description}</Text>
                <Text>{getFormatDate(item.date)}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  movement: {
    flexDirection: "row",
    backgroundColor: "#49599a",
    padding: 12,
    marginVertical: 6,
    elevation: 3,
    justifyContent: "space-between",
    borderRadius: 6,
    shadowColor: "#001064",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  // container: {
  //   backgroundColor: "#aab6fe",
  //   padding: 8,
  //   borderRadius: 6,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  amountContainer: {
    backgroundColor: "#aab6fe",
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MovementsList;
