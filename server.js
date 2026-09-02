const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend đang chạy!");
});

app.post("/api/message", (req, res) => {
    const { name, message } = req.body;

    console.log("Tên:", name);
    console.log("Lời nhắn:", message);

    res.json({
        success: true,
        message: "Đã nhận dữ liệu!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server chạy tại port ${PORT}`);
});
