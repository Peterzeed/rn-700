import { useContext, useEffect ,useState } from "react";
import { React } from "react";
import MovementsOutput from "../components/MovementsOutput";
import { getDateMinusDays } from "../utility/date";

import { MovementsContext } from "../store/movements-context";
import { fetchMoveMents } from "../utility/http";
import LoadingOverLay from "../components/Ui/loadingOverlay";

const RecentMovements = () => {
  const [isFetching , setIsFetching] = useState(true);
  const movementsCtx = useContext(MovementsContext);

  useEffect(() => {
    async function getMovement() {
      setIsFetching(true);
      const movements = await fetchMoveMents();
      setIsFetching(false);
      movementsCtx.setMovement(movements);
    }
    
    getMovement();
  }, []);

  if(isFetching){
    return <LoadingOverLay/>;
  }

  const recentMovs = movementsCtx.movements.filter((mov) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 30);

    return mov.date >= date7DaysAgo && mov.date <= today;
  });
  return <MovementsOutput movements={recentMovs} period="last 7 days" />;
};

export default RecentMovements;
