require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const WA_ACCOUNT_ID = process.env.WHATSAPP_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

app.get("/templates", async (req, res) => {
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v18.0/${WA_ACCOUNT_ID}/message_templates`,
            {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
