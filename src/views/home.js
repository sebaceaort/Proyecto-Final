import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user-context";
import fiwareApi from "../services/fiwareApi";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export default function Home() {
  const { user } = useContext(UserContext);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
      async function getEntities() {
        if(user){
          const entities = await fiwareApi.getEntities();
          setEntities((oldEntities) => [...oldEntities, entities]);

        }
      }
      getEntities()
  }, [user]);

  return (
    <>
      <h1>Home</h1>

      {user ? <JSONPretty data={entities} /> : ""}
    </>
  );
}
