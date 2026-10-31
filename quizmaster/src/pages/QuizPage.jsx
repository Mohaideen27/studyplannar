import { useState, useEffect, useRef, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useQuery, useMutation } from "@tanstack/react-query";

import { getQuiz, getQuestions, saveAttempt } from "../api";

function QuizPage() {
  const { quizId } = useParams();

  const navigate = useNavigate();

  // Current question number
  const [currentIndex, setCurrentIndex] = useState(0);

  // Store selected answers
  const [answers, setAnswers] = useState({});

  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);

  const [timerStarted, setTimerStarted] = useState(false);


  // Store timer reference
  const timerRef = useRef(null);

  // Prevent multiple submissions
  const submittedRef = useRef(false);

  // Fetch quiz details
  const {
    data: quiz,
    isLoading: quizLoading,
    isError: quizError,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz(quizId),
  });

  // Fetch quiz questions
  const {
    data: questions = [],
    isLoading: questionsLoading,
    isError: questionsError,
  } = useQuery({
    queryKey: ["questions", quizId],
    queryFn: () => getQuestions(quizId),
  });

  // Save attempt to the backend
  const mutation = useMutation({
    mutationFn: saveAttempt,
    onSuccess: (attempt) => {
      navigate(`/result/${attempt.id}`);
    },
  });

  // Start timer when quiz data is loaded
  useEffect(() => {
    if (quiz && timeLeft === 0 && !submittedRef.current) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [quiz, timeLeft]);

  // Submit quiz
  const submitQuiz = useCallback(() => {
    if (
      submittedRef.current ||
      !quiz ||
      questions.length === 0 ||
      mutation.isPending
    ) {
      return;
    }

    submittedRef.current = true;

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Calculate score
    let score = 0;

    const review = questions.map((question) => {
      const selectedAnswer = answers[question.id];

      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      }

      return {
        question: question.question,
        options: question.options,
        selectedAnswer: selectedAnswer === undefined ? null : selectedAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        isCorrect,
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    const attempt = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      score,
      totalQuestions: questions.length,
      percentage,
      answers: review,
      date: new Date().toISOString(),
    };

    mutation.mutate(attempt);
  }, [answers, questions, quiz, mutation]);

  // Countdown timer
  useEffect(() => {
    if (
      timeLeft <= 0 ||
      !quiz ||
      questions.length === 0 ||
      quizLoading ||
      questionsLoading ||
      submittedRef.current
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft > 0, quiz, questions.length, quizLoading, questionsLoading]);

  // Submit automatically when time expires
  useEffect(() => {
    if (
      timeLeft === 0 &&
      quiz &&
      questions.length > 0 &&
      !quizLoading &&
      !questionsLoading &&
      !submittedRef.current
    ) {
      submitQuiz();
    }
  }, [
    timeLeft,
    quiz,
    questions.length,
    quizLoading,
    questionsLoading,
    submitQuiz,
  ]);

  // Handle loading and errors
  if (quizLoading || questionsLoading) {
    return <h2 className="center">Loading quiz...</h2>;
  }

  if (quizError || questionsError) {
    return <h2 className="center">Unable to load quiz. Please try again.</h2>;
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="container center">
        <h2>No questions available for this quiz.</h2>

        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  // Convert seconds into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="container">
      <div className="quiz-header">
        <button onClick={() => navigate("/")}>Exit Quiz</button>

        <h2>{quiz.title}</h2>

        <div className="timer">
          Time: {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>
      </div>

      <div className="question-card">
        <p>
          Question {currentIndex + 1} of {questions.length}
        </p>

        <div className="question-progress">
          <div
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <h2>{currentQuestion.question}</h2>

        <div className="options-list">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={
                answers[currentQuestion.id] === index
                  ? "option selected"
                  : "option"
              }
              onClick={() =>
                setAnswers((previousAnswers) => ({
                  ...previousAnswers,
                  [currentQuestion.id]: index,
                }))
              }
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>

        <div className="question-actions">
          <button
            className="secondary"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((index) => index - 1)}
          >
            Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button onClick={() => setCurrentIndex((index) => index + 1)}>
              Next Question
            </button>
          ) : (
            <button onClick={submitQuiz} disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Quiz"}
            </button>
          )}
        </div>

        <p>
          Answered: {Object.keys(answers).length} / {questions.length}
        </p>

        {mutation.isError && (
          <p className="error">Unable to save your result. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
