import React, { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/update-context";
import fiwareApi from "../services/fiwareApi";
import { ShowDataListChildrenItem } from "./ShowDataListChildrenItem";

export const ShowDataListChildren = ({ type, id }) => {
  const [data, setData] = useState([]);
  const { update } = useContext(UpdateContext);
  useEffect(() => {
    async function getEntities() {
      const entities = await fiwareApi.getDataByQuery("ref" + type + "==" + id);
      setData(entities);
    }
    getEntities();
  }, [type, id, update]);

  return data.map((item) => <ShowDataListChildrenItem key={item.id} item={item} />);
};
