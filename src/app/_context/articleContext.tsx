"use client";

import { createContext, useContext, ReactNode } from "react";

interface ArticleContextType {
  title: string;
  content: string;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within ArticleProvider");
  }
  return context;
};

interface ArticleProviderProps {
  children: ReactNode;
  title: string;
  content: string;
}

export const ArticleProvider = ({
  children,
  title,
  content,
}: ArticleProviderProps) => {
  return (
    <ArticleContext.Provider value={{ title, content }}>
      {children}
    </ArticleContext.Provider>
  );
};
