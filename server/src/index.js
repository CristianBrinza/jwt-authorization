"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = __importDefault(require("./utils/logger")); // Import the logger
dotenv_1.default.config();
const app = (0, express_1.default)();
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Apply rate limiting to all requests
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Enable CORS for all origins
app.use((0, cors_1.default)());
// Connect to MongoDB
(0, db_1.default)();
// Route Middleware
app.use('/api/auth', auth_1.default);
app.use('/api/user', user_1.default);
// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger_1.default.info(`Server running on port ${PORT}`);
});
