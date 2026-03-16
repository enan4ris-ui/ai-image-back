const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const getImageAnalysis = require("./image-analysis/index");
const getImageCreator = require("./image-creator");
const getIngredientRecognition = require("./ingredient-recognition");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 168;

app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-domain.onrender.com"],
}));
app.use(express.json());

app.post("/analyze-image", upload.single("file"), getImageAnalysis);
app.post("/image-creator", getImageCreator);
app.post("/ingredient-recognition", getIngredientRecognition);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
