import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <QuizContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  return useContext(QuizContext);
}
