import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Article ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch article" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
