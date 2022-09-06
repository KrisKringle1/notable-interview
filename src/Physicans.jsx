import React, { useEffect, useState } from "react";
import "./physician.css";

export const Physicans = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState("");
  useEffect(() => {
    getPhysicans();
    getAppointments();
  }, []);

  const getPhysicans = async () => {
    const res = await fetch("http://localhost:3000/physicians", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDoctors(data);
  };

  const getAppointments = async () => {
    const res = await fetch("http://localhost:3000/appointments", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAppointments(data);
  };

  const displayAppt = async (doctor) => {
    const res = await fetch(`http://localhost:3000/physicians/${doctor.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAppointments(data);
    const doctorName = doctor.first_name + " " + doctor.last_name;
    setCurrentDoctor(doctorName);
  };

  const reset = async () => {
    getPhysicans();
    getAppointments();
    setCurrentDoctor("");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "lightgrey",
            width: "100%",
          }}
        >
          <h2>Physicans</h2>
          <ul>
            {doctors.map((doctor) => {
              return (
                <li onClick={() => displayAppt(doctor)}>
                  {doctor.first_name}, {doctor.last_name}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            background: "grey",
            width: "100%",
          }}
        >
          <h1>
            Current Doctor: {currentDoctor ? currentDoctor : "No Dr Selected"}
          </h1>
          <h2>Appointments</h2>

          <table>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Time</th>
              <th>Kind</th>
            </tr>
            {appointments.map((appointment) => {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.name}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.kind}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};
