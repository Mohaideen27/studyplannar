import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getAttempts } from "../api";

function History() {
  const navigate = useNavigate();

  const {
    data: attempts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["attempts"],
    queryFn: getAttempts,
  });

  if (isLoading) {
    return <h2 className="center">Loading history...</h2>;
  }

  if (isError) {
    return <h2 className="center">Unable to load quiz history.</h2>;
  }

  // Show newest attempts first
  const sortedAttempts = [...attempts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="container">
      <header className="page-header">
        <h1>Quiz History 📊</h1>

        <button onClick={() => navigate("/")}>Back to Home</button>
      </header>

      {sortedAttempts.length === 0 ? (
        <div className="empty-state">
          <h2>No quiz attempts yet.</h2>
          <p>Take your first quiz to see your progress here.</p>

          <button onClick={() => navigate("/")}>Explore Quizzes</button>
        </div>
      ) : (
        <div className="history-list">
          {sortedAttempts.map((attempt) => (
            <div className="history-card" key={attempt.id}>
              <div>
                <h3>{attempt.quizTitle}</h3>

                <p>Category: {attempt.category}</p>

                <p>
                  Score: {attempt.score} / {attempt.totalQuestions}
                </p>

                <p>Date: {new Date(attempt.date).toLocaleString()}</p>
              </div>

              <div className="history-result">
                <h2>{attempt.percentage}%</h2>

                <button onClick={() => navigate(`/result/${attempt.id}`)}>
                  Review Result
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
