const client = require("../huggingface-inference");

const getImageCreator = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }

    const provider = process.env.HF_IMAGE_PROVIDER || "fal-ai";
    const model = process.env.HF_IMAGE_MODEL || "zai-org/GLM-Image";

    const result = await client.textToImage(
      {
        provider,
        model,
        inputs: input,
        parameters: { num_inference_steps: 5 },
      },
      {
        outputType: "dataUrl",
      }
    );

    res.json({ result });
  } catch (err) {
    console.error("IMAGE CREATION ERROR:", err);
    res.status(500).json({
      error: "Image creation failed",
      details: err?.message || "Unknown error",
    });
  }
};