const client = require("../huggingface-inference");

const getImageCreator = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }
    const provider = process.env.HF_IMAGE_PROVIDER || "fal-ai";
    const model = process.env.HF_IMAGE_MODEL || "zai-org/GLM-Image";

    const image = await client.textToImage({
      provider,
      model,
      inputs: input,
      parameters: { num_inference_steps: 5 },
    });
    const arrayBuffer = await image.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const dataUrl = `data:image/png;base64,${base64}`;

    res.json({ result: dataUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image creation failed" });
  }
};

module.exports = getImageCreator;
