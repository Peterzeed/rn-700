import axios from "axios";

const BACKEND_URL =
  "";  //ใช้ Key ของท่านเอง

export async function storeMovement(expenseData) {
  const response = await axios.post(
    BACKEND_URL + `/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchMoveMents() {
  const response = await axios.get(BACKEND_URL + `/expenses.json`);
  const movements = [];

  for (const key in response.data) {
    const movementobj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    movements.push(movementobj);
  }
  return movements;
}

export function updateMovement(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteMovement(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
