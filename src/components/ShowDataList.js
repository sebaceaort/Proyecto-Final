import React from "react";
import { ShowDataListItem } from "./ShowDataListItem";

export const ShowDataList = ({ array = [] }) => {
  return (
    <>
      {array.map((a, i) => {
        return <ShowDataListItem item={a} key={i} />;
      })}
    </>
  );
};
