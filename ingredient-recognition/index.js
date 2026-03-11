const client = require("../huggingface-inference");

const getIngredientRecognition = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }

    const result = await client.chatCompletion({
      model: "Qwen/Qwen2.5-VL-7B-Instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract the likely ingredients from this description. Return a short, readable list:\n\n${input}`,
            },
          ],
        },
      ],
    });

    const content = result?.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "No response from model" });
    }

    res.json({ result: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ingredient recognition failed" });
  }
};

module.exports = getIngredientRecognition;
