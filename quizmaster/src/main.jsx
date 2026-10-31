import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { QuizProvider } from "./QuizContext";

import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/Result";
import History from "./pages/History";
import ManageQuestions from "./pages/ManageQuestions";

import "./index.css";
import "./App.css";

// Create the TanStack Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/quiz/:quizId" element={<QuizPage />} />

            <Route path="/result/:attemptId" element={<Result />} />

            <Route path="/history" element={<History />} />

            <Route path="/manage-questions" element={<ManageQuestions />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
