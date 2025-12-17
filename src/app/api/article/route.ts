import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const POST = async (request: Request) => {
  try {
    const { title, content, userId } = await request.json();

    if (!title || !content || !userId) {
      return new Response(
        JSON.stringify({ error: "Title, content, and userId are required" }),
        { status: 400 }
      );
    } else {
    }
    const res = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Summarize briefly in 2-3 sentences:\nTitle: ${title}\nContent: ${content}`,
            },
          ],
        },
      ],
    });
    const response = res.response;
    const summary = response.text() || "";
    const article = await prisma.article.create({
      data: { title, content, summary, userId },
    });
    return new Response(JSON.stringify({ article }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create article" }), {
      status: 500,
    });
  }
};

export const GET = async (request: Request) => {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};
