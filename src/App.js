import { createContext, useEffect, useState } from "react";
import Dashboard from "./Pages/Dashboard";
import { getAllData } from "./services/data-api";

export const TableData = createContext();

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData()
      .then((r) => r.json())
      .then((d) => setData(d.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <TableData.Provider value={data}>
        <Dashboard />
      </TableData.Provider>
    </>
  );
}

export default App;
