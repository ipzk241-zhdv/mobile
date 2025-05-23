const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const fs = require("fs-extra");
const path = require("path");

const pusherConfig = require("./pusher.json");
const pusher = new Pusher({
    appId: pusherConfig.app_id,
    key: pusherConfig.key,
    secret: pusherConfig.secret,
    cluster: pusherConfig.cluster,
    useTLS: true,
});

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const STORAGE_DIR = path.join(__dirname, "storage");

if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR);
}

function getChatFilePath(chatId) {
    return path.join(STORAGE_DIR, `${chatId}.json`);
}

function loadChatHistory(chatId) {
    const file = getChatFilePath(chatId);
    if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    } else {
        const emptyHistory = [];
        fs.writeFileSync(file, JSON.stringify(emptyHistory, null, 2));
        return emptyHistory;
    }
}

function saveChatHistory(chatId, history) {
    fs.writeFileSync(getChatFilePath(chatId), JSON.stringify(history, null, 2));
}

app.put("/chats/:chatId/users/:name", (req, res) => {
    const { chatId, name } = req.params;
    const history = loadChatHistory(chatId);

    const event = {
        action: "join",
        name,
        timestamp: new Date().toISOString(),
    };

    history.push(event);
    saveChatHistory(chatId, history);
    pusher.trigger(`chat_${chatId}`, "join", event);

    res.sendStatus(200);
});

app.delete("/chats/:chatId/users/:name", (req, res) => {
    const { chatId, name } = req.params;
    const history = loadChatHistory(chatId);

    const event = {
        action: "part",
        name,
        timestamp: new Date().toISOString(),
    };

    history.push(event);
    saveChatHistory(chatId, history);
    pusher.trigger(`chat_${chatId}`, "part", event);

    res.sendStatus(200);
});

app.post("/chats/:chatId/users/:name/messages", (req, res) => {
    const { chatId, name } = req.params;
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Invalid message" });
    }

    const history = loadChatHistory(chatId);

    const event = {
        action: "message",
        name,
        message,
        timestamp: new Date().toISOString(),
    };

    history.push(event);
    saveChatHistory(chatId, history);
    pusher.trigger(`chat_${chatId}`, "message", event);

    res.sendStatus(200);
});

app.get("/chats/:chatId/history", (req, res) => {
    const { chatId } = req.params;
    const history = loadChatHistory(chatId);
    res.json(history);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
