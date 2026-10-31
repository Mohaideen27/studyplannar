import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import {
  getQuizzes,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../api";

function ManageQuestions() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form state
  const [quizId, setQuizId] = useState("1");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");
  const [explanation, setExplanation] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch quizzes
  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });

  // Fetch questions for selected quiz
  const {
    data: questions = [],
    isLoading: questionsLoading,
    isError,
  } = useQuery({
    queryKey: ["questions", quizId],
    queryFn: () => getQuestions(quizId),
    enabled: Boolean(quizId),
  });

  // Refresh the question list after a change
  const refreshQuestions = () => {
    queryClient.invalidateQueries({
      queryKey: ["questions"],
    });
  };

  // Add question
  const addMutation = useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      refreshQuestions();
      resetForm();
    },
  });

  // Update question
  const updateMutation = useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => {
      refreshQuestions();
      resetForm();
    },
  });

  // Delete question
  const deleteMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: refreshQuestions,
  });

  // Reset form
  function resetForm() {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
    setExplanation("");
    setEditingId(null);
  }

  // Update one answer option
  function handleOptionChange(index, value) {
    setOptions((previousOptions) =>
      previousOptions.map((option, optionIndex) =>
        optionIndex === index ? value : option,
      ),
    );
  }

  // Add or edit question
  function handleSubmit(event) {
    event.preventDefault();

    if (
      !questionText.trim() ||
      options.some((option) => !option.trim()) ||
      !explanation.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const questionData = {
      quizId,
      question: questionText.trim(),
      options: options.map((option) => option.trim()),
      correctAnswer: Number(correctAnswer),
      explanation: explanation.trim(),
    };

    if (editingId !== null) {
      updateMutation.mutate({
        id: editingId,
        ...questionData,
      });
    } else {
      addMutation.mutate(questionData);
    }
  }

  // Fill form with existing question
  function handleEdit(question) {
    setQuestionText(question.question);
    setOptions(question.options);
    setCorrectAnswer(String(question.correctAnswer));
    setExplanation(question.explanation);
    setQuizId(String(question.quizId));
    setEditingId(question.id);
  }

  if (quizzesLoading) {
    return <h2 className="center">Loading quizzes...</h2>;
  }

  const saving = addMutation.isPending || updateMutation.isPending;

  return (
    <div className="container">
      <header className="page-header">
        <h1>Manage Questions</h1>

        <button onClick={() => navigate("/")}>Back to Home</button>
      </header>

      <section className="form-card">
        <h2>{editingId !== null ? "Edit Question" : "Add Question"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Select Quiz</label>

          <select
            value={quizId}
            onChange={(event) => {
              setQuizId(event.target.value);
              resetForm();
            }}
          >
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>

          <label>Question</label>

          <input
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            placeholder="Enter your question"
            required
          />

          <label>Answer Options</label>

          {options.map((option, index) => (
            <input
              key={index}
              value={option}
              onChange={(event) =>
                handleOptionChange(index, event.target.value)
              }
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}

          <label>Correct Answer</label>

          <select
            value={correctAnswer}
            onChange={(event) => setCorrectAnswer(event.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>

          <label>Explanation</label>

          <input
            value={explanation}
            onChange={(event) => setExplanation(event.target.value)}
            placeholder="Explain the correct answer"
            required
          />

          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId !== null
                ? "Update Question"
                : "Add Question"}
          </button>

          {editingId !== null && (
            <button type="button" className="secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        {(addMutation.isError || updateMutation.isError) && (
          <p className="error">Unable to save question.</p>
        )}
      </section>

      <section className="question-management">
        <h2>Existing Questions</h2>

        {questionsLoading && <p>Loading questions...</p>}

        {isError && <p>Unable to load questions.</p>}

        {questions.map((question) => (
          <div className="managed-question" key={question.id}>
            <div>
              <h3>{question.question}</h3>

              <p>Correct answer: {question.options[question.correctAnswer]}</p>
            </div>

            <div className="managed-actions">
              <button onClick={() => handleEdit(question)}>Edit</button>

              <button
                className="danger"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this question?",
                    )
                  ) {
                    deleteMutation.mutate(question.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {questions.length === 0 && !questionsLoading && (
          <p>No questions found for this quiz.</p>
        )}

        {deleteMutation.isError && (
          <p className="error">Unable to delete question.</p>
        )}
      </section>
    </div>
  );
}

export default ManageQuestions;
