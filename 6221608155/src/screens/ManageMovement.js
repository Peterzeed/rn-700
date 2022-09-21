import { React, useLayoutEffect } from "react";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../components/Ui/Button";
import IconButton from "../components/Ui/IconButton";
import { Ionicons } from "@expo/vector-icons";

import { MovementsContext } from "../store/movements-context";

import MovementForm from "../components/ManageMovements/MovementForm";

const ManageMovement = ({ route, navigation }) => {
  const movementsCtx = useContext(MovementsContext);

  const movId = route.params?.movId;
  const isEditting = !!movId;

  const selectedMovement = movementsCtx.movements.find((mov) => mov.id == movId);
  console.log(selectedMovement);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Update Movement" : "Add Movement",
    });
  }, [navigation, isEditting]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditting) {
      movementsCtx.updateMovement(movId, expenseData
      );
      // update
    } else {
      movementsCtx.addMovement(expenseData);
    }
    navigation.goBack();
  };

  const deleteHandler = () => {
    movementsCtx.deleteMovement(movId);
    navigation.goBack();
  };

  console.log(movId);

  return (
    <View style={styles.container}>
      <MovementForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditting ? "Update" : "Add"}
        defaultValues = {selectedMovement}
      />
      {isEditting && (
        <View style={styles.deleteContainer}>
          <Ionicons
            name="trash"
            size={36}
            color="#fff"
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#7986cb",
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#fff",
    alignItems: "center",
  },
});

export default ManageMovement;
