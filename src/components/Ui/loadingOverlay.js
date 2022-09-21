import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingOverLay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#e4d192" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#000000",
  },
});

export default LoadingOverLay;
