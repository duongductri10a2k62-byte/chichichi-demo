const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const filePath = path.join(__dirname, "messages.json");

app.post("/api/message", (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({
            success: false,
            message: "Thiếu thông tin!"
        });
    }

    let messages = [];

    // Đọc file messages.json
    try {
        const data = fs.readFileSync(filePath, "utf8");
        messages = JSON.parse(data);
    } catch (error) {
        console.log("Không đọc được file:", error);
    }

    // Thêm dữ liệu mới
    messages.push({
        name: name,
        message: message,
        time: new Date().toLocaleString("vi-VN")
    });

    // GHI VÀO FILE
    fs.writeFileSync(
        filePath,
        JSON.stringify(messages, null, 4),
        "utf8"
    );

    console.log("Đã lưu vào:", filePath);
    console.log("Tên:", name);
    console.log("Lời nhắn:", message);

    res.json({
        success: true
    });
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000/demo.html");
});