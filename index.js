const express = require("express");
const physicians = require("./database/physicians");
const appointments = require("./database/appointments.json");
const cors = require("cors");

//middleware

const app = express();

app.use(cors());
app.use(express.json()); //req.body

app.get("/physicians", (req, res) => {
  res.send(physicians);
});

app.get("/physicians/:id", async (req, res) => {
  const { id } = req.params;
  const newAppointments = appointments.filter(
    (appointment) => appointment.doctor_id === id
  );

  console.log(newAppointments);
  res.send(newAppointments);
});

app.get("/appointments", async (req, res) => {
  res.send(appointments);
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
