const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const waitingListRoutes = require("./routes/waitingListRoutes");
const userRoutes = require("./routes/userRoutes");
const swaggerDocs = require("./swagger");

// Middleware
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);       // Routes for event operations
app.use("/api/bookings", bookingRoutes);   // Routes for ticket bookings
app.use("/api/waiting-list", waitingListRoutes); // Routes for waiting list
app.use("/api/users", userRoutes);         // Routes for user operations
const PORT = process.env.PORT || 8000;


// Serve Swagger UI documentation
const client_url = "http://localhost:8000";
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
swaggerDocs(app);
app.get("/swagger-spec", (req, res) => {
  res.json(swaggerSpec);
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
