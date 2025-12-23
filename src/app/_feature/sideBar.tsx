"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { TrushIcon } from "../_icons/trush";

interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function AppSidebar() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const res = await fetch("/api/article");
        if (!res.ok) {
          console.error("Failed to fetch articles:", res.statusText);
          return;
        }
        const data = await res.json();
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
        console.log(data, "articles");
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);
  const handleDeleteArticle = async (
    id: string,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    try {
      const res = await fetch(`/api/article?id=${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to delete article:", await res.text());
        return;
      }

      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar className="border-none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-semibold text-black">
              History
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2.5 pt-5">
                {loading ? (
                  <SidebarMenuItem>
                    <span className="text-base font-medium text-gray-500">
                      Loading...
                    </span>
                  </SidebarMenuItem>
                ) : articles.length === 0 ? (
                  <SidebarMenuItem>
                    <span className="text-base font-medium text-gray-500">
                      No articles yet
                    </span>
                  </SidebarMenuItem>
                ) : (
                  articles.map((article) => (
                    <SidebarMenuItem key={article.id}>
                      <SidebarMenuButton asChild>
                        <div className="flex justify-between items-center">
                          <a href={`/articles/${article.id}`}>
                            <span className="text-base font-medium text-black line-clamp-1">
                              {article.title}
                            </span>
                          </a>
                          <button
                            onClick={(e) => handleDeleteArticle(article.id, e)}
                            className="opacity-0 group-hover/menu-item:opacity-100 transition-opacity"
                          >
                            <TrushIcon />
                          </button>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-screen w-15 bg-sidebar border-r border-[#ddd] py-20 flex justify-center">
        <SidebarTrigger />
      </div>
    </div>
  );
}

export const SideBar = AppSidebar;
