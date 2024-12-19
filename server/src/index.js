"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const all_routes_1 = __importDefault(require("./routes/all.routes"));
const app = (0, express_1.default)();
// Allow access origin for requests from frontend
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN, // This is used to specify allowed CORS origin
    credentials: true,
}));
// For using JSON data
app.use(express_1.default.json());
// For sending cookies
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.json({ message: "hello" });
});
// API Routes
app.use('/api/v1', all_routes_1.default);
app.listen(process.env.PORT || 5001, () => {
    console.log("Port is running :", process.env.PORT);
});
exports.default = app;
