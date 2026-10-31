import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getQuizzes } from "../api";
import { useQuizContext } from "../QuizContext";

function Home() {
  const navigate = useNavigate();

  const { selectedCategory, setSelectedCategory } = useQuizContext();

  // Fetch quizzes from the backend
  const {
    data: quizzes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });

  // Get unique categories
  const categories = useMemo(() => {
    return ["All", ...new Set(quizzes.map((quiz) => quiz.category))];
  }, [quizzes]);

  // Filter quizzes by category
  const filteredQuizzes = useMemo(() => {
    if (selectedCategory === "All") {
      return quizzes;
    }

    return quizzes.filter((quiz) => quiz.category === selectedCategory);
  }, [quizzes, selectedCategory]);

  if (isLoading) {
    return <h2 className="center">Loading quizzes...</h2>;
  }

  if (isError) {
    return (
      <h2 className="center">
        Unable to load quizzes. Please start JSON Server.
      </h2>
    );
  }

  return (
    <div className="container">
      <header className="navbar">
        <h1>QuizMaster 🧠</h1>

        <nav>
          <button onClick={() => navigate("/history")}>Quiz History</button>

          <button onClick={() => navigate("/manage-questions")}>
            Manage Questions
          </button>
        </nav>
      </header>

      <section className="hero">
        <h2>Test Your Knowledge</h2>

        <p>Choose a quiz, answer questions, and improve your skills.</p>
      </section>

      <section className="category-section">
        <h2>Choose a Category</h2>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="quiz-section">
        <h2>Available Quizzes</h2>

        <div className="quiz-grid">
          {filteredQuizzes.map((quiz) => (
            <div className="quiz-card" key={quiz.id}>
              <span className="category-label">{quiz.category}</span>

              <h3>{quiz.title}</h3>

              <p>{quiz.description}</p>

              <p>⏱ Time: {quiz.timeLimit} minutes</p>

              <button onClick={() => navigate(`/quiz/${quiz.id}`)}>
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <p>No quizzes found in this category.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
