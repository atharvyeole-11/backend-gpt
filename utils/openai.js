import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured.");
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`OpenAI API error: ${response.status} ${errorBody}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content ?? "I couldn't generate a response.";
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default getOpenAIAPIResponse;
