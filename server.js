const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const filePath = path.join(__dirname, "messages.json");

// Kiểm tra server
app.get("/", (req, res) => {
    res.send("Backend đang chạy!");
});

// Nhận lời nhắn
app.post("/api/message", (req, res) => {

    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({
            success: false,
            message: "Thiếu thông tin!"
        });
    }

    let messages = [];

    // Đọc messages.json
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");

            if (data.trim()) {
                messages = JSON.parse(data);
            }
        }
    } catch (error) {
        console.log("Không đọc được file:", error);
    }

    // Thêm lời nhắn mới
    messages.push({
        name: name,
        message: message,
        time: new Date().toLocaleString("vi-VN")
    });

    // Lưu vào messages.json
    try {
        fs.writeFileSync(
            filePath,
            JSON.stringify(messages, null, 4),
            "utf8"
        );

        console.log("Đã lưu vào:", filePath);
    } catch (error) {
        console.log("Không ghi được file:", error);
    }

    console.log("Tên:", name);
    console.log("Lời nhắn:", message);

    res.json({
        success: true,
        message: "Đã nhận dữ liệu!"
    });
});

// Render cung cấp PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server chạy tại port ${PORT}`);
});
