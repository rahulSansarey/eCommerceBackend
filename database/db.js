import pkg from "pg";
const { Client } = pkg;

const database = new Client({
  // Hardcoding the database userand password connection details for development purposes. In a production environment, these should be stored in environment variables for security.
  user: "postgres",
  host: "localhost",
  database: "mern_ecommerce",
  password: "rk578785",
  port: 5432,
});

try {
  await database.connect();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Exit the process with an error code
}

export default database;
