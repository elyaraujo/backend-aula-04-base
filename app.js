import "dotenv/config";
import express from "express";
import cors from "cors";
import "./dataBase/connection.js";
import product from "./dataBase/product.js";


const app = express();

app.use(express.json());
app.use(cors());

// Create
app.post("/product", async (request, response) => {
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
app.get("/product/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const productFounded = await product.findById(id);

    if (!productFounded) {
      return response.status(404).json({ 
        message: "Product not found" 
      });
    }

    response.status(200).json({ product: productFounded });
  } catch (error) {
    response.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.get("/products", async (request, response) => {
  const allProducts = await product.find();

  return response.status(200).json({ product: allProducts });
});

// Update
app.put("/products/:id", async (request, response) => {
  const { id } = request.params;
  /**
   * pega o id, e busca o registro no banco
   * não encontrou -> devolve 404
   * 
   * Valida os dados no body
   * ex: se tiver price no body, valide se é um número
   * 
   * se não passar na validação devolve 400
   * 
   * ai sim aeu altero o registro
   */

  const productUpdated = await product.findByIdAndUpdate(id, request.body, {
    new: true
  });
  return response.status(200).json({ productUpdated });

});

// Delete
app.delete("/products/:id", async (request, response) => {
  try {
    await product.deleteOne({ _id: request.params.id });
    return response.status(200).end();
    
  } 
  catch (error) {
    return response.status(500).json({ 
      message: error.message || "Internal server error",
    });
    
  }  
  
});

app.listen(3000, () => console.log("Server listening on port 3000"));
