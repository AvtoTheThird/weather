import { useEffect, useState, useRef } from "react";
import "./App.css";

import axios from "axios";
function App() {
  const apikey = "4ad5aba3c312c0fe60f46f2ad92c903c";

  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [units, setUnits] = useState("metric");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      FetchData();
    }
  }, [units]);
  const FetchData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apikey}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <input type="text" onChange={(e) => setCity(e.target.value)} />
      <button onClick={FetchData}>search</button>
      <select
        name="units"
        onChange={(e) => {
          setUnits(e.target.value);
        }}
      >
        <option value="metric">Celsius</option>
        <option value="imperial">Farenhait</option>
      </select>

      {data.main && (
        <div>
          <h1>
            Weather in {city}, {data.sys.country}
          </h1>
          <p>feels_like: {data.main.feels_like}</p>
          <p>humidity: {data.main.humidity}</p>
          <p>pressure: {data.main.pressure}</p>
          <p>
            temp_max: {data.main.temp} {units === "metric" ? "C" : "F"}
          </p>
          <p>
            temp_min: {data.main.temp_min} {units === "metric" ? "C" : "F"}
          </p>
          <p>
            temp_max: {data.main.temp_max} {units === "metric" ? "C" : "F"}
          </p>
        </div>
      )}
    </>
  );
}

export default App;
