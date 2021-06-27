const express = require("express");
const cors = require("cors");

const app1 = express();
const app2 = express();

const PORT_1 = 5011;
const PORT_2 = 5012;

/*
 *
 * ******************************************** Prerequisites *********************************************** //
 */
app1.use(cors());
app2.use(cors());

app1.use(express.json());
app2.use(express.json());

app1.use(
  express.urlencoded({
    extended: true,
  })
);
app2.use(
  express.urlencoded({
    extended: true,
  })
);

/*
 *
 * ****************************************** Routers and Routes ******************************************** //
 */
const handler = (serverNum) => (req, res) => {
  console.log(`Server ${serverNum}: ${req.method} ${req.url}`);
  //   res.send(`Hello from Server ${serverNum}!`);

  // Wait for 10 seconds before responding
  setTimeout(() => {
    res.send(`Hello from server ${serverNum}!`);
  }, 10000);
  // "Error: socket hang up" IF servers are closed
};

// Only handle GET and POST requests
app1.get("*", handler(1)).post("*", handler(1));
app2.get("*", handler(2)).post("*", handler(2));

app1.listen(PORT_1, () => {
  console.log(`Server 1 is running on ${PORT_1}`);
});

app2.listen(PORT_2, () => {
  console.log(`Server 2 is running on ${PORT_2}`);
});

module.exports = { PORT_1, PORT_2 };
