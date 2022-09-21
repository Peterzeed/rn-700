import { useContext } from "react";
import  { React } from "react";
import MovementsOutput from "../components/MovementsOutput";
import { view, Text, StyleSheet } from "react-native";
import { MovementsContext } from "../store/movements-context";

const AllMovements = () => {
  const MovementsCtx = useContext(MovementsContext);

  return (
    <MovementsOutput movements={MovementsCtx.movements} period="Total👾" />
  );
};
const styles = StyleSheet.create({});

export default AllMovements;
