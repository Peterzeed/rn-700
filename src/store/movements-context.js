import { createContext, useReducer } from "react";

// const MOVEMENTS_DATA = [
//   {
//     id: "m1",
//     description: "A Computer Book",
//     amount: 299,
//     date: new Date("2022-08-21"),
//   },
//   {
//     id: "m2",
//     description: "Some Fruit",
//     amount: 120,
//     date: new Date("2022-07-22"),
//   },
//   {
//     id: "m3",
//     description: "Express Capsule",
//     amount: 420,
//     date: new Date("2022-07-25"),
//   },
//   {
//     id: "m4",
//     description: "Movie: Thor",
//     amount: 400,
//     date: new Date("2022-07-31"),
//   },
//   {
//     id: "m5",
//     description: "The Witcher 3",
//     amount: 3000,
//     date: new Date("2022-08-08"),
//   },
// ];

export const MovementsContext = createContext({
  movements: [],
  setMovement: (movements) => {},
  addMovement: ({ description, amount, date }) => {},
  updateMovement: (id, { description, amount, date }) => {},
  deleteMovement: (id) => {},
});

const movementsReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      //id, data
      console.log(action.payload.id);
      const movIndex = state.findIndex((mov) => mov.id == action.payload.id);
      const updatableMove = state[movIndex]; //old mov
      const updatedMov = { ...updatableMove, ...action.payload.data }; // update old mov
      const updatedMovs = [...state]; // call old arr (mov)
      updatedMovs[movIndex] = updatedMov; // replace arr[index] = new mov
      console.log(movIndex, updatedMov);
      return updatedMovs;
    // console.log(state[movIndex]);
    case "DELETE":
      return state.filter((mov) => mov.id !== action.payload);
    default:
      return state;
  }
};

const MovementsContextProvider = ({ children }) => {
  const [movementsState, dispatch] = useReducer(
    movementsReducer,
    []
    // MOVEMENTS_DATA
  );

  const setMovement = (movements) => {
    dispatch({ type: "SET", payload: movements });
  };

  const addMovement = (movementData) => {
    dispatch({ type: "ADD", payload: movementData });
  };

  const deleteMovement = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateMovement = (id, movementData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: movementData } });
  };

  const value = {
    movements: movementsState,
    setMovement: setMovement,
    addMovement: addMovement,
    updateMovement: updateMovement,
    deleteMovement: deleteMovement,
  };

  return (
    <MovementsContext.Provider value={value}>
      {children}
    </MovementsContext.Provider>
  );
};

export default MovementsContextProvider;
