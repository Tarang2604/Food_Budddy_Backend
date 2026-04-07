const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use(cors({
  origin: ['http://localhost:1234','https://food-buddy-nine.vercel.app']  // 
}));

app.get("/swiggy", async (req, res) => {
  const targetUrl = "https://namastedev.com/api/v1/listRestaurants";

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://namastedev.com/",
        "Origin": "https://namastedev.com",
        "Connection": "keep-alive",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.status, error.message);

    res.status(error.response?.status || 500).json({
      error: "API failed",
      status: error.response?.status,
      message: error.response?.data || error.message,
    });
  }
});

app.get("/menu/:resId", async (req, res) => {
  const { resId } = req.params;
  const targetUrl = `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`;

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Referer": "https://namastedev.com/",
        "Origin": "https://namastedev.com",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Menu Error:", error.response?.status, error.message);

    res.status(error.response?.status || 500).json({
      error: "Failed to fetch menu",
      message: error.response?.data || error.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Food Buddy backend running at http://localhost:${PORT}`);
}); 