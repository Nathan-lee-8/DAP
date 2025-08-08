exports.handler = async (event) => {
  const text = event.arguments.text;

  if (!text) {
    throw new Error("No text provided");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "omni-moderation-latest",
        input: text
      })
    });

    const result = await response.json();
    const moderation = result.results?.[0] || {};

    return {
      flagged: moderation.flagged || false,
      categories: moderation.categories || {},
      category_scores: moderation.category_scores || {},
    };

  } catch (error) {
    console.error(error);
    throw new Error("Moderation API call failed");
  }
};