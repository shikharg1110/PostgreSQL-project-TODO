const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
})