import express from "express";
import cors from "cors";
import  "./dataBase/connection.js";
import product from "./dataBase/product.js";

const app = express();

app.use(express.json());
app.use(cors());

// Create
app.post("/products", async (request, response) => {
  const { name, price, description } = request.body;

  if (!name || !description || typeof price !== "number") {
    return response.status(400).json({ message: "Invalid request body" });
  }

  const newProduct = new product({
    name,
    description,
    price,
  });

  await newProduct.save();
  response.status(201).json({ newProduct });
});

// Read
app.get("/products", async (request, response) => {});

app.get("/products/:id", async (request, response) => {});

// Update
app.put("/products/:id", async (request, response) => {});

// Delete
app.delete("/products/:id", async (request, response) => {});

app.listen(3000, () => console.log("Server listening on port 3000"));
