import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      const res = await axios.post("https://bfhl-kjgc.onrender.com/bfhl", jsonInput);
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or request failed");
    }
  };

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" }, 
  ];

  const renderFilteredResponse = () => {
    if (!response) return null;
    const filteredData = {};
    selectedOptions.forEach((option) => {
      if (option.value === "numbers") filteredData.numbers = response.numbers;
      if (option.value === "alphabets")
        filteredData.alphabets = response.alphabets;
      if (option.value === "highest_lowercase_alphabet")
        filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    });

    return (
      <div>
        <h3>Filtered Response</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>BFHL Frontend</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON like {"data": ["M","1","334","4","B","Z","a"]}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <>
          <h2>Response:</h2>
          <Select
            isMulti
            name="filters"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedOptions}
          />
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
