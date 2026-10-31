import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAttempt } from "../api";

function Result() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const {
    data: attempt,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => getAttempt(attemptId),
  });

  if (isLoading) {
    return <h2 className="center">Loading result...</h2>;
  }

  if (isError || !attempt) {
    return (
      <div className="container center">
        <h2>Unable to load your result.</h2>

        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const correctCount = attempt.answers.filter(
    (answer) => answer.isCorrect,
  ).length;

  const incorrectCount = attempt.totalQuestions - correctCount;

  return (
    <div className="container">
      <div className="result-card">
        <h1>Quiz Completed! 🎉</h1>

        <h2>{attempt.quizTitle}</h2>

        <div className="score-circle">
          <span>{attempt.percentage}%</span>
        </div>

        <h2>
          Score: {attempt.score} / {attempt.totalQuestions}
        </h2>

        <div className="result-stats">
          <div>
            <h3>{correctCount}</h3>
            <p>Correct Answers</p>
          </div>

          <div>
            <h3>{incorrectCount}</h3>
            <p>Incorrect or Unanswered</p>
          </div>
        </div>

        <p>
          {attempt.percentage >= 80
            ? "Excellent work! Keep learning."
            : attempt.percentage >= 50
              ? "Good effort! Keep practicing."
              : "Keep practicing. You will improve!"}
        </p>

        <button onClick={() => navigate("/")}>Back to Home</button>

        <button className="secondary" onClick={() => navigate("/history")}>
          View Quiz History
        </button>
      </div>

      <section className="review-section">
        <h2>Review Your Answers</h2>

        {attempt.answers.map((answer, index) => (
          <div
            key={index}
            className={
              answer.isCorrect
                ? "review-card correct-card"
                : "review-card incorrect-card"
            }
          >
            <h3>
              Question {index + 1}: {answer.question}
            </h3>

            <p>
              Your answer:{" "}
              {answer.selectedAnswer === null
                ? "Not answered"
                : answer.options[answer.selectedAnswer]}
            </p>

            <p>Correct answer: {answer.options[answer.correctAnswer]}</p>

            <p>Status: {answer.isCorrect ? "Correct" : "Incorrect"}</p>

            <p>
              <strong>Explanation:</strong> {answer.explanation}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Result;
