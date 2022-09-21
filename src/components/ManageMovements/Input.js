import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ label, invalid, textInputConfig, style }) => {
  const inputStyles = [styles.input];

  if (textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, styles]}>
      <Text style={(styles.label, invalid && styles.invalidLabel)}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    color: "black",
    padding: 6,
    borderRadius: 6,
    fontSize: 17,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "#fff",
  },
  invalidInput: {
    backgroundColor: "#5c6bc0",
  },
});

export default Input;
