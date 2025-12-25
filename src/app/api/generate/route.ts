import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const { articleId, content } = await req.json();

    if (!articleId || !content) {
      return new Response("Missing data", { status: 400 });
    }

    const result = await model.generateContent(prompt(content));
    const text = result.response.text();

    const quizData = JSON.parse(text);

    // 5 асуулт баталгаажуулна
    if (!quizData.questions || quizData.questions.length !== 5) {
      throw new Error("Invalid quiz format");
    }

    // DB save
    for (const q of quizData.questions) {
      await prisma.quiz.create({
        data: {
          question: q.question,
          options: q.options,
          answer: q.answer,
          articleId,
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Quiz generation failed", { status: 500 });
  }
}

const prompt = (content: string) => `
You are a quiz generator.

From the following text, generate EXACTLY 5 multiple-choice questions.

Rules:
- Each question must have exactly 4 options
- Only ONE option is correct
- Return ONLY valid JSON
- No explanations, no markdown, no extra text

JSON format:
{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "one of the options exactly"
    }
  ]
}

TEXT:
${content}
`;
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    const quizzes = await prisma.quiz.findMany({
      where: { articleId: articleId || "" },
    });

    return Response.json({ quizzes });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch quizzes", { status: 500 });
  }
}
