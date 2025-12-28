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

    const user = await prisma.user.findFirst({
      where: { clerkId: userId },
    });

    const response = res.response;
    const summary = response.text() || "";
    const article = await prisma.article.create({
      data: { title, content, summary, userId: user?.id || "" },
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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
       return new Response(JSON.stringify({ articles: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ articles: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const articles = await prisma.article.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch all articles" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Article ID is required" }), {
        status: 400,
      });
    }

    await prisma.quiz.deleteMany({
      where: { articleId: id },
    });

    await prisma.article.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Article deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete article" }), {
      status: 500,
    });
  }
};
