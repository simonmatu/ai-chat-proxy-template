export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch(process.env.COZE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.COZE_API_KEY}`,
    },
    body: JSON.stringify({
      bot_id: process.env.COZE_BOT_ID,
      user: "user_001",
      query: messages?.[messages.length - 1]?.content || "",
      stream: false
    }),
  });

  const data = await response.json();
  const reply = data?.messages?.[0]?.content || "对不起，AI 暂时无法回复。";
  res.status(200).json({ reply });
}
