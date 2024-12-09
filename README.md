
## **Event Ticket Booking System API**

### **Description**
This API implements an event ticket booking system that allows users to book tickets, manage waiting lists, and handle cancellations in a concurrent environment. It ensures thread safety for booking operations and uses a relational database to store order details. The API also includes comprehensive error handling, test-driven development (TDD), and proper data management.

---

### **Features**
- **Initialize Event**: Create events with a specified number of available tickets.
- **Book Tickets**: Allow users to book tickets, and automatically add users to the waiting list if tickets are sold out.
- **Cancel Bookings**: Cancel bookings, and automatically assign tickets to waiting list users.
- **Event Status**: View the status of an event, including the number of available tickets and the waiting list count.
- **Concurrency Handling**: Proper management of concurrent booking and cancellation requests.
- **Error Handling**: Proper error handling with meaningful messages.
- **TDD**: Unit and integration tests for core functionalities, achieving 80% test coverage.

---

### **Installation**

#### **1. Clone the Repository**
```bash
git clone <repository_url>
cd <repository_folder>
```

#### **2. Install Dependencies**
```bash
npm install
```

#### **3. Set up Environment Variables**
Create a `.env` file in the root directory and add the following variables:
```plaintext
PORT=8000
DATABASE_URL=<your_database_url>
```

#### **4. Run Database Migrations**
If you're using Sequelize to manage your database, run the following to set up the database schema:
```bash
npx sequelize-cli db:migrate
```

#### **5. Start the Server**
```bash
npm start
```
Your API will be available at `http://localhost:8000`.

---

### **API Endpoints**

#### **1. Initialize Event**
- `POST /initialize`: Initialize a new event with a given number of tickets.

#### **2. Book Tickets**
- `POST /book`: Book a ticket for a user. If tickets are sold out, add the user to the waiting list.

#### **3. Cancel Bookings**
- `POST /cancel`: Cancel a booking for a user. If there is a waiting list, automatically assign the ticket to the next user.

#### **4. Event Status**
- `GET /status/:eventId`: Retrieve the current status of an event (available tickets, waiting list count).

---

### **Concurrency and Thread Safety**
The system ensures that booking and cancellation requests are processed safely in a concurrent environment. We utilize proper locking mechanisms and asynchronous handling to avoid race conditions and ensure accurate ticket bookings.

---

### **Error Handling**
- Detailed error messages are provided for all possible scenarios.
- Common edge cases such as booking when no tickets are available or cancelling an already cancelled booking are properly handled.

---

### **Testing**

This project follows a **Test-Driven Development (TDD)** approach. Core functionalities are tested before implementation, and tests are written to cover different scenarios:
- Unit tests for core logic.
- Integration tests for API endpoints.

#### **Running Tests**
To run the tests, use the following command:
```bash
npm test
```

Ensure that all tests pass and that at least 80% test coverage is achieved.

---

### **Database Schema**
The application stores event information, bookings, and waiting lists in a relational database. The main entities are:

- **Event**: Stores details about events (ID, name, available tickets).
- **Booking**: Stores user booking information (user ID, event ID, ticket details).
- **Waiting List**: Stores users who are waiting for tickets if the event is sold out.

---

### Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the API.
- **Sequelize**: ORM for interacting with the relational database (e.g., PostgreSQL).
- **Jest**: Testing framework for writing and running unit tests.
- **Swagger**: For API documentation (optional).

---

### **Development Setup**

1. Clone the repository: `git clone <repo_url>`.
2. Install dependencies: `npm install`.
3. Set up environment variables in `.env`.
4. Run migrations: `npx sequelize-cli db:migrate`.
5. Start the server: `npm start`.

---

### **Contributing**
Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request.

---

