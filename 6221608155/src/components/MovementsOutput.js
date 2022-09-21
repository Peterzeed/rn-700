import React from "react";
import { View, Text, StyleSheet } from "react-native";

import MovementsList from "./MovementsList";
import MovementsSummary from "./MovementsSummary";


const MovementsOutput = ({ movements , period }) => {
  return (
    <View style={styles.container}>
      <MovementsSummary data={movements} period={period} />
      <MovementsList data={movements} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#e8eaf6",
  },
});

export default MovementsOutput;
