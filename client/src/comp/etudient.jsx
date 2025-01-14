import   "./etudient.css";
import  { useEffect, useState } from "react";

import 'primeicons/primeicons.css';
        
const Etudient = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
  


   


      
      useEffect(() => {
        fetch("http://localhost:3000/afficher")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((responseData) => {
            console.log("Fetched data:", responseData); // Log the full response
            if (responseData.success && Array.isArray(responseData.data)) {
              setStudents(responseData.data); // Set only the data array to state
            } else {
              console.error("Unexpected response format:", responseData);
              setError("Unexpected response format.");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setError("Failed to fetch students. Please try again.");
          });
      }, []);
      


    return (
        <div className="bloc_etudient">
        {students.map((student) => (
          <div className="etudients" key={student._id}>
            <p className="name">{student.name}</p>
            <p className="nb_sc">{student.date.length}</p>
            <br />


            <div className="bloc_2">


              <div className="bloc_payment_non_payment">
                <span className="parag">
                  Les séances payées : <span >{student.totals.payantes }</span>
                </span>
                <br />
                <br />
                <span className="parag">
                  Les séances non payées : <span>{student.totals.nonPayantes }</span> 
                </span>
              </div>
              <div className="bloc_date">
                {student.date.map((dates, index) => (
                  <span className="dates" key={index}>
                    <i
                      className="pi pi-calendar"
                      style={{ marginRight: "10px" }}
                    ></i>
                    {dates.date} {/* Access the 'date' field to render the value */}
                    {dates.payment === "oui" ? (
                      <div className="payment_oui">
                        <i
                          className="pi pi-check-circle"
                          style={{
                            fontSize: "11px",
                            marginRight: "5px",
                            position: "relative",
                            top: "1px",
                          }}
                        ></i>
                        payment
                      </div>
                    ) : (
                      <div className="payment_non">
                        <i
                          className="pi pi-times-circle"
                          style={{
                            fontSize: "11px",
                            marginRight: "5px",
                            position: "relative",
                            top: "1px",
                          }}
                        ></i>
                        non payment
                      </div>
                    )}
                  </span>
                ))}
               
              </div>
            </div>
          </div>
        ))}
      </div>
      
    );
}

export default Etudient;
