import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../Ui/Button";
import { getFormatDate } from "../../utility/date";
import { InputAccessoryView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const MovementForm = ({
  onSubmit,
  onCancel,
  submitButtonLabel,
  defaultValues,
}) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormatDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enterValue) => {
    setInput((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enterValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    console.log(expenseData);

    // console.log(isNaN(expenseData.amount));
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";

    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please correct your input values");
      setInput((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInValid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Movement</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid = {!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid = {!input.date.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid = {!input.description.isValid}
        textInputConfig={{
          multiline: true,
          value: input.amount.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values : please check your entered Data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    margin: 8,
    color: '#fff',
  },
});

export default MovementForm;
