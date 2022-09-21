import { useContext } from "react";
import { React } from "react";
import MovementsOutput from "../components/MovementsOutput";
import { getDateMinusDays } from "../utility/date";

import { MovementsContext } from "../store/movements-context";

const RecentMovements = () => {
  const movementsCtx = useContext(MovementsContext);

  

  const recentMovs = movementsCtx.movements.filter((mov) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 30);

    return mov.date >= date7DaysAgo && mov.date <= today;
  });
  return <MovementsOutput movements={recentMovs} period="last 7 days" />;
};

export default RecentMovements;
