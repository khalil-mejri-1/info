import "./seve_sc.css";
import  { useState } from "react";
import { Checkbox } from "primereact/checkbox";

import "primereact/resources/themes/lara-light-cyan/theme.css";

const SaveSc = () => {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
      };
    const [date , setDate ]=useState(getCurrentDate());

    const [selectedNames, setSelectedNames] = useState([]); // مصفوفة لتخزين الأسماء المحددة


    const handleCheckboxChange = (names, isChecked) => {
        if (!Array.isArray(names)) names = [names]; // Convert single name to array
        if (isChecked) {
          // Add selected names
          setSelectedNames((prev) => [...new Set([...prev, ...names])]);
        } else {
          // Remove unselected names
          setSelectedNames((prev) => prev.filter((name) => !names.includes(name)));
        }
      };
      

      
      const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (selectedNames.length === 0 || !date) {
          alert("Please select at least one student and set a date.");
          return;
        }
      
        const data = { names: selectedNames, date };
      
        try {
          const response = await fetch('http://localhost:3000/add_etudient', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log("Result:", result);
            setSelectedNames([]);
            setDate("");
            window.location.reload();

          } else {
            console.log("Failed to save data.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
    return (
        <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">  Add séances :</h2>
          <div className="form-group">
            <input type="date" value={date}  onChange={(e)=>setDate(e.target.value)}   />
          </div>
       
          <div className="form-group">
  <label>Etudient</label>
  <br />
  <label>
    <Checkbox
      onChange={(e) =>
        handleCheckboxChange(
          ["omar", "nour", "siwar", "chaima", "amal"], // Names array
          e.checked // Checkbox state
        )
      }
      checked={
        ["omar", "nour", "siwar", "chaima", "amal"].every((name) =>
          selectedNames.includes(name)
        )
      } // Check if all names are selected
    />
    <span style={{ marginLeft: "10px" }}>all</span>
  </label>
<br />
  <div className="checkbox-group">
    {["omar", "amal", "chaima", "nour", "siwar"].map((name) => (
      <label key={name}>
        <Checkbox
          onChange={(e) => handleCheckboxChange(name, e.checked)}
          value={name}
          checked={selectedNames.includes(name)}
        />
        <span style={{ marginLeft: "10px" }}>{name}</span>
      </label>
    ))}
  </div>
</div>

         
          <button type="submit" className="submit-button">Save  séances  </button>
        </form>
      </div>
  
    );
}

export default SaveSc;
