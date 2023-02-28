import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForHistory from "../../components/CardForHistory/CardForHistory";
import { getHistory, TracksHistoryArray } from "../../store/spotify";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(TracksHistoryArray);

  const getArrayHistory = useCallback(async () => {
    await dispatch(getHistory());
  }, [dispatch]);

  useEffect(() => {
    getArrayHistory().catch(console.error)
  }, [getArrayHistory]);

  const createCard = history.map((element) => {
    return <CardForHistory author={element.author} time={element.time} name={element.name} key={element._id}/>
  })
  return <div>
    {createCard}
  </div>;
};

export default TrackHistory;
