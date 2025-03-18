"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const university_routes_1 = __importDefault(require("./routes/university.routes"));
const essay_routes_1 = __importDefault(require("./routes/essay.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
// Load environment variables
dotenv_1.default.config();
// Initialize Prisma client
exports.prisma = new client_1.PrismaClient();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "UniPathAI API is running!" });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/applications", application_routes_1.default);
app.use("/api/universities", university_routes_1.default);
app.use("/api/essays", essay_routes_1.default);
app.use("/api/payments", payment_routes_1.default);
// Global error handler
app.use((err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "An unexpected error occurred",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
