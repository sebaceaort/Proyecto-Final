import React, { useEffect, useState } from "react";
import fiwareApi from "../services/fiwareApi";
import { ShowChildrenItem } from "./ShowChildrenItem";

export const ShowChildrens = ({ type, id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getEntities() {
      const entities = await fiwareApi.getDataByQuery("ref" + type + "==" + id);
      setData(entities);
    }
    getEntities();
  }, [type, id]);

  return data.map((item) => <ShowChildrenItem key={item.id} item={item} />);
};
