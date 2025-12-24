import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { clerkId, email, name } = await request.json();

    if (!clerkId || !email) {
      return new Response("Missing data", { status: 400 });
    }

    await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        clerkId,
        email,
        name,
      },
    });

    console.log("USER CREATE API HIT", clerkId, email);
    return new Response("OKKK", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
