# QuizMaster – Online Quiz and Assessment Platform Using React

Since you're a fresher, we'll build this project step by step using **simple React code, Axios, JSON Server, React Router, and TanStack Query**.

I'll explain what each file does, how the code works, and how the frontend communicates with the backend.

We'll build a working quiz application first, then understand the React concepts used in it.

## 1. What will we build?

Our application, **QuizMaster**, will allow users to:

- View available quizzes.
- Select categories such as React, JavaScript, HTML, and CSS.
- Answer multiple-choice questions.
- Take a quiz with a timer.
- See their score and percentage.
- Review correct and incorrect answers with explanations.
- View their previous quiz attempts.
- Add, edit, and delete questions.

### Technologies we will use

| Technology      | Purpose                                 |
| --------------- | --------------------------------------- |
| React           | Build the user interface                |
| `useState()`    | Store answers and other changing data   |
| `useEffect()`   | Handle actions such as starting a timer |
| `useContext()`  | Share information between components    |
| `useRef()`      | Store a timer reference                 |
| React Router    | Navigate between pages                  |
| `useNavigate()` | Navigate programmatically               |
| `useParams()`   | Read quiz IDs from URLs                 |
| Axios           | Send HTTP requests                      |
| JSON Server     | Provide a simple backend API            |
| TanStack Query  | Fetch, cache, and update server data    |
| `useMemo()`     | Cache calculated results                |
| `useCallback()` | Cache function references               |

**Beginner tip:** You don't need to use every React hook in every component. We'll use each one where it makes sense.

---

## 2. Understand how the application works

The application has three main parts.

**1. React frontend**

Displays the quiz list, questions, answer options, timer, and results.

**2. Axios and TanStack Query**

Axios sends API requests. TanStack Query helps manage server data, including loading, caching, and updating.

**3. JSON Server backend**

Stores the quizzes, questions, and previous attempts in a JSON file.

### Example user flow

```text
Home Page
    |
    v
Select Quiz Category
    |
    v
Choose a Quiz
    |
    v
Answer Questions
    |
    v
Submit Answers
    |
    v
View Score and Percentage
    |
    v
Review Correct Answers
    |
    v
View Quiz History
```

We'll use React Router to move between these pages without reloading the entire application.

---

# Step 1: Create the React project

First, make sure Node.js is installed on your computer.

Open your terminal and run:

```bash
npm create vite@latest quizmaster -- --template react
```

Move into the project folder:

```bash
cd quizmaster
```

Install the packages:

```bash
npm install
```

Install Axios:

```bash
npm install axios
```

Install React Router:

```bash
npm install react-router-dom
```

Install TanStack Query:

```bash
npm install @tanstack/react-query
```

Install JSON Server:

```bash
npm install -D json-server
```

### What did we install?

- `axios`: Communicates with the backend.
- `react-router-dom`: Provides navigation between pages.
- `@tanstack/react-query`: Manages API data and loading states.
- `json-server`: Creates a simple REST API from our JSON file.

Start the frontend:

```bash
npm run dev
```

Vite will display a local development address, usually `http://localhost:5173`.

You can stop the server with `Ctrl + C` before continuing if necessary.

# Step 2: Create the project folders

Inside `src`, create the following folders and files.

```text
quizmaster/
│
├── db.json
├── package.json
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── api.js
    ├── QuizContext.jsx
    ├── index.css
    ├── App.css
    │
    └── pages/
        ├── Home.jsx
        ├── QuizPage.jsx
        ├── Result.jsx
        ├── History.jsx
        └── ManageQuestions.jsx
```

Don't worry if this looks like a lot of files. Each file has a specific responsibility, and I'll explain them one at a time.

---

# Step 3: Create the backend using JSON Server

Create `db.json` in the main `quizmaster` folder.

### File: `db.json`

```json
{
  "quizzes": [
    {
      "id": "1",
      "title": "React Fundamentals",
      "category": "React",
      "description": "Test your understanding of React basics.",
      "timeLimit": 5
    },
    {
      "id": "2",
      "title": "JavaScript Basics",
      "category": "JavaScript",
      "description": "Test your JavaScript knowledge.",
      "timeLimit": 5
    },
    {
      "id": "3",
      "title": "HTML Fundamentals",
      "category": "HTML",
      "description": "Learn and test HTML concepts.",
      "timeLimit": 5
    },
    {
      "id": "4",
      "title": "CSS Fundamentals",
      "category": "CSS",
      "description": "Test your CSS knowledge.",
      "timeLimit": 5
    }
  ],
  "questions": [
    {
      "id": "1",
      "quizId": "1",
      "question": "What is React?",
      "options": [
        "A database",
        "A JavaScript library",
        "An operating system",
        "A programming language"
      ],
      "correctAnswer": 1,
      "explanation": "React is a JavaScript library for building user interfaces."
    },
    {
      "id": "2",
      "quizId": "1",
      "question": "Which hook manages state in a functional component?",
      "options": ["useEffect", "useRef", "useState", "useMemo"],
      "correctAnswer": 2,
      "explanation": "useState allows a component to store and update state."
    },
    {
      "id": "3",
      "quizId": "1",
      "question": "What is JSX?",
      "options": [
        "A database query",
        "A syntax extension for JavaScript",
        "A CSS framework",
        "A browser"
      ],
      "correctAnswer": 1,
      "explanation": "JSX lets developers write HTML-like syntax in JavaScript."
    },
    {
      "id": "4",
      "quizId": "1",
      "question": "What is the purpose of props?",
      "options": [
        "To pass data between components",
        "To create a database",
        "To style a page",
        "To start a server"
      ],
      "correctAnswer": 0,
      "explanation": "Props allow a parent component to pass data to a child component."
    },
    {
      "id": "5",
      "quizId": "1",
      "question": "Which hook is commonly used for side effects?",
      "options": ["useState", "useEffect", "useMemo", "useCallback"],
      "correctAnswer": 1,
      "explanation": "useEffect is commonly used for side effects such as subscriptions and timers."
    },
    {
      "id": "6",
      "quizId": "2",
      "question": "Which keyword declares a block-scoped variable that can be reassigned?",
      "options": ["const", "let", "static", "fixed"],
      "correctAnswer": 1,
      "explanation": "let declares a block-scoped variable that can be reassigned."
    },
    {
      "id": "7",
      "quizId": "2",
      "question": "Which method creates a new array by transforming each element?",
      "options": ["filter()", "find()", "map()", "push()"],
      "correctAnswer": 2,
      "explanation": "map() creates a new array from the results of calling a function on each element."
    },
    {
      "id": "8",
      "quizId": "2",
      "question": "Which operator checks strict equality?",
      "options": ["=", "==", "===", "!="],
      "correctAnswer": 2,
      "explanation": "The === operator compares values without converting their types."
    },
    {
      "id": "9",
      "quizId": "2",
      "question": "Which value represents an intentional absence of an assigned value?",
      "options": [
        "undefined",
        "null",
        "Both can represent absence of a value",
        "Neither"
      ],
      "correctAnswer": 2,
      "explanation": "null and undefined both represent absence of a value, but their meanings differ."
    },
    {
      "id": "10",
      "quizId": "2",
      "question": "Which method filters an array based on a condition?",
      "options": ["map()", "filter()", "join()", "sort()"],
      "correctAnswer": 1,
      "explanation": "filter() returns a new array containing elements that pass the condition."
    },
    {
      "id": "11",
      "quizId": "3",
      "question": "Which HTML element creates a hyperlink?",
      "options": ["<p>", "<a>", "<div>", "<h1>"],
      "correctAnswer": 1,
      "explanation": "The a element creates a hyperlink using its href attribute."
    },
    {
      "id": "12",
      "quizId": "3",
      "question": "Which element represents the largest heading by default?",
      "options": ["<h6>", "<head>", "<h1>", "<title>"],
      "correctAnswer": 2,
      "explanation": "The h1 element represents the highest-level heading."
    },
    {
      "id": "13",
      "quizId": "3",
      "question": "Which attribute provides alternative text for an image?",
      "options": ["src", "href", "alt", "title-only"],
      "correctAnswer": 2,
      "explanation": "The alt attribute provides a text alternative for an image."
    },
    {
      "id": "14",
      "quizId": "3",
      "question": "Which element creates an unordered list?",
      "options": ["<ol>", "<ul>", "<li>", "<list>"],
      "correctAnswer": 1,
      "explanation": "The ul element creates an unordered list."
    },
    {
      "id": "15",
      "quizId": "3",
      "question": "Which element is used to create a form?",
      "options": ["<form>", "<section>", "<article>", "<footer>"],
      "correctAnswer": 0,
      "explanation": "The form element groups controls for submitting user input."
    },
    {
      "id": "16",
      "quizId": "4",
      "question": "Which property changes text color?",
      "options": ["background", "font-size", "color", "border"],
      "correctAnswer": 2,
      "explanation": "The color property sets the foreground color of text."
    },
    {
      "id": "17",
      "quizId": "4",
      "question": "Which property adds space inside an element's border?",
      "options": ["margin", "padding", "gap-only", "outline"],
      "correctAnswer": 1,
      "explanation": "Padding is the space between an element's content and its border."
    },
    {
      "id": "18",
      "quizId": "4",
      "question": "Which CSS layout system uses rows and columns?",
      "options": ["CSS Grid", "Float only", "Text layout", "Inline text"],
      "correctAnswer": 0,
      "explanation": "CSS Grid is designed for two-dimensional layouts with rows and columns."
    },
    {
      "id": "19",
      "quizId": "4",
      "question": "Which property rounds an element's corners?",
      "options": [
        "border-style",
        "border-radius",
        "corner-shape-only",
        "outline-radius"
      ],
      "correctAnswer": 1,
      "explanation": "border-radius controls how rounded an element's corners are."
    },
    {
      "id": "20",
      "quizId": "4",
      "question": "Which property controls the space outside an element's border?",
      "options": ["padding", "margin", "line-height", "font-weight"],
      "correctAnswer": 1,
      "explanation": "Margin controls the space outside an element's border."
    }
  ],
  "attempts": []
}
```

### Understand the data structure

Our database contains three collections.

**1. `quizzes`**

Stores the quiz name, category, description, and time limit.

**2. `questions`**

Stores the question, four options, correct answer, and explanation.

For example:

```json
{
  "correctAnswer": 1
}
```

The answer index starts at zero:

| Index | Option        |
| ----- | ------------- |
| 0     | First option  |
| 1     | Second option |
| 2     | Third option  |
| 3     | Fourth option |

Therefore, `correctAnswer: 1` means the second option is correct.

**3. `attempts`**

Stores the results of previous quizzes, including the score and answers selected by the user.

### Start the backend

Run:

```bash
npx json-server db.json --port 3000
```

Test these endpoints in your browser:

- `http://localhost:3000/quizzes`
- `http://localhost:3000/questions`
- `http://localhost:3000/attempts`

Keep JSON Server running while developing the application.

---

# Step 4: Create the Axios API service

We will keep our API functions in a separate file, just as we did in StudyFlow.

### File: `src/api.js`

```javascript
import axios from "axios";

const API_URL = "http://localhost:3000";

// Get all quizzes
export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes`);
  return response.data;
};

// Get one quiz
export const getQuiz = async (id) => {
  const response = await axios.get(`${API_URL}/quizzes/${id}`);
  return response.data;
};

// Get questions for a particular quiz
export const getQuestions = async (quizId) => {
  const response = await axios.get(`${API_URL}/questions?quizId=${quizId}`);

  return response.data;
};

// Add a question
export const addQuestion = async (question) => {
  const response = await axios.post(`${API_URL}/questions`, question);

  return response.data;
};

// Update a question
export const updateQuestion = async ({ id, ...question }) => {
  const response = await axios.patch(`${API_URL}/questions/${id}`, question);

  return response.data;
};

// Delete a question
export const deleteQuestion = async (id) => {
  await axios.delete(`${API_URL}/questions/${id}`);
};

// Save a quiz attempt
export const saveAttempt = async (attempt) => {
  const response = await axios.post(`${API_URL}/attempts`, attempt);

  return response.data;
};

// Get previous quiz attempts
export const getAttempts = async () => {
  const response = await axios.get(`${API_URL}/attempts`);

  return response.data;
};

// Get one quiz attempt
export const getAttempt = async (id) => {
  const response = await axios.get(`${API_URL}/attempts/${id}`);

  return response.data;
};
```

### Explanation

Consider this function:

```javascript
export const getQuizzes = async () => {
  const response = await axios.get("http://localhost:3000/quizzes");

  return response.data;
};
```

It sends a GET request to JSON Server and returns the list of quizzes.

We can call the function from any component.

For example:

```javascript
const quizzes = await getQuizzes();
```

We don't need to repeat the Axios URL in every component because the API functions are reusable.

---

# Step 5: Set up React Context

We will use Context API to share the selected quiz category across components.

### File: `src/QuizContext.jsx`

```jsx
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
```

### Explanation

We create a shared state:

```jsx
const [selectedCategory, setSelectedCategory] = useState("All");
```

Initially, the user sees all quiz categories.

When the user selects React, we can update the shared value:

```jsx
setSelectedCategory("React");
```

Another component can access that value using:

```jsx
const { selectedCategory } = useQuizContext();
```

**Why use Context?**

Without Context, we might need to pass the selected category through several components using props. Context allows components inside the provider to access it directly.

---

# Step 6: Set up React Router and TanStack Query

We need to configure routing and the TanStack Query client before building our pages.

### File: `src/main.jsx`

Replace the existing code with:

```jsx
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
```

### Understand the routes

| Route               | Page                   |
| ------------------- | ---------------------- |
| `/`                 | Home and quiz listing  |
| `/quiz/1`           | Take quiz with ID 1    |
| `/result/1`         | View attempt with ID 1 |
| `/history`          | Previous quiz attempts |
| `/manage-questions` | Manage quiz questions  |

This route:

```jsx
<Route path="/quiz/:quizId" element={<QuizPage />} />
```

uses `:quizId` as a dynamic route parameter.

When a user opens `/quiz/2`, the quiz page can read the ID `2` using `useParams()`.

### What is TanStack Query?

We create a `QueryClient` and provide it to the application.

TanStack Query will help us:

- Fetch quiz data.
- Cache API responses.
- Track loading and error states.
- Save quiz attempts through mutations.
- Refresh relevant data after a question is added or deleted.

We will use `useQuery()` to fetch data and `useMutation()` to change server data.

---

# Step 7: Build the Home Page and Quiz Listing

The home page will display the available quizzes and allow users to filter by category.

We'll use:

- `useQuery()` to fetch quizzes.
- `useQuizContext()` to share the selected category.
- `useMemo()` to calculate the filtered quiz list.
- `useNavigate()` to open other pages.

### File: `src/pages/Home.jsx`

```jsx
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
```

### Explanation

**1. Fetch quizzes using `useQuery()`**

```jsx
const {
  data: quizzes = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ["quizzes"],
  queryFn: getQuizzes,
});
```

- `queryKey` identifies the cached quiz data.
- `queryFn` tells TanStack Query how to fetch the data.
- `data` contains the returned quizzes.
- `isLoading` tells us whether the initial fetch is in progress.
- `isError` tells us whether the request failed.

**2. Navigate to the quiz page**

```jsx
navigate(`/quiz/${quiz.id}`);
```

If the quiz ID is `2`, this opens `/quiz/2`.

**3. Filter quizzes using `useMemo()`**

```jsx
const filteredQuizzes = useMemo(() => {
  if (selectedCategory === "All") {
    return quizzes;
  }

  return quizzes.filter((quiz) => quiz.category === selectedCategory);
}, [quizzes, selectedCategory]);
```

The filtered list is recalculated when the quizzes or selected category change.

For a small application, this calculation would also work without `useMemo()`. We're using it here to demonstrate how the hook works.

---

# Step 8: Build the Quiz Page

This is the most important part of our application.

The quiz page will:

1. Read the quiz ID from the URL.
2. Fetch the quiz and its questions.
3. Display one question at a time.
4. Allow the user to select an answer.
5. Display a countdown timer.
6. Calculate the final score.
7. Save the result in JSON Server.

We'll use several React concepts here:

| Hook            | Purpose                                |
| --------------- | -------------------------------------- |
| `useState()`    | Store answers and the current question |
| `useEffect()`   | Start and clean up the timer           |
| `useRef()`      | Store the interval ID                  |
| `useParams()`   | Read the quiz ID from the URL          |
| `useNavigate()` | Navigate to the result page            |
| `useCallback()` | Keep the submission function stable    |
| `useQuery()`    | Fetch quiz data                        |
| `useMutation()` | Save the quiz attempt                  |

### File: `src/pages/QuizPage.jsx`

```jsx
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
```

### Important explanations

**1. Read the quiz ID**

```jsx
const { quizId } = useParams();
```

If the user opens `/quiz/3`, then `quizId` is `"3"`.

We use this ID to fetch the correct quiz and questions.

**2. Store the user's answers**

```jsx
const [answers, setAnswers] = useState({});
```

Suppose the user selects the second option for question 1 and the third option for question 2.

The state will look like this:

```javascript
{
  "1": 1,
  "2": 2
}
```

The keys are question IDs, and the values are the selected option indexes.

**3. Calculate the score**

```jsx
const isCorrect = selectedAnswer === question.correctAnswer;
```

If the selected answer matches the correct answer, the user receives one point.

The percentage is calculated using:

```javascript
const percentage = Math.round((score / questions.length) * 100);
```

**4. Understand `useRef()`**

```jsx
const timerRef = useRef(null);
```

We use this to store the timer's interval ID so we can stop the timer when the quiz is submitted.

We also use a ref to help prevent duplicate submissions.

**5. Understand `useCallback()`**

```jsx
const submitQuiz = useCallback(() => {
  // Submission logic
}, [answers, questions, quiz, mutation]);
```

`useCallback()` caches the function reference until its dependencies change.

Here, it also helps us use the submission function in an effect without creating an unnecessary dependency loop.

**Timer note:** This is a beginner-friendly client-side timer. It works while the quiz page is open, but it isn't a secure exam timer. A production application should validate the deadline on the backend.

---

# Step 9: Build the Result Page

After submitting a quiz, the application saves the result to JSON Server and navigates to the result page.

The result page will display:

- Quiz name.
- Score.
- Percentage.
- Correct and incorrect answers.
- Correct answers and explanations.
- A button to return home.

### File: `src/pages/Result.jsx`

```jsx
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
```

### How does this page work?

The quiz page saves an attempt containing the score and a copy of the question review data.

For example:

```javascript
{
  quizTitle: "React Fundamentals",
  score: 4,
  totalQuestions: 5,
  percentage: 80
}
```

The result page reads the attempt ID from the URL:

```jsx
const { attemptId } = useParams();
```

Then it retrieves the saved attempt:

```jsx
useQuery({
  queryKey: ["attempt", attemptId],
  queryFn: () => getAttempt(attemptId),
});
```

This means the result can be opened again later without recalculating the score.

**Why save the explanations with the attempt?**

If you change a question in the question bank later, the saved attempt can still show the original question and answer information from the time the user took the quiz.

---

# Step 10: Build the Quiz History Page

Now we'll let users see their previous quiz attempts.

The history page will display:

- Quiz name.
- Category.
- Score.
- Percentage.
- Attempt date.
- A button to review the result.

### File: `src/pages/History.jsx`

```jsx
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
```

### Explanation

The history page retrieves all saved attempts using `getAttempts()`.

We sort them with:

```javascript
const sortedAttempts = [...attempts].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);
```

This creates a copy of the array and sorts it from newest to oldest.

**Important:** In this beginner version, quiz history is shared because JSON Server doesn't implement user authentication. If you want individual student accounts later, you'll need a proper backend with authentication and user-specific data.

---

# Step 11: Build the Question Management Page

This feature makes QuizMaster more than a basic quiz application.

An administrator can:

- Select a quiz.
- Add a new question.
- Enter four answer options.
- Select the correct answer.
- Add an explanation.
- Edit existing questions.
- Delete questions.

We'll use `useQuery()` to fetch quizzes and questions, and `useMutation()` to add, update, or delete questions.

### File: `src/pages/ManageQuestions.jsx`

```jsx
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
```

### Understand `useMutation()`

Consider this code:

```jsx
const addMutation = useMutation({
  mutationFn: addQuestion,
  onSuccess: () => {
    refreshQuestions();
    resetForm();
  },
});
```

It means:

1. When we submit a new question, call `addQuestion()`.
2. Axios sends the POST request.
3. JSON Server saves the question.
4. If the request succeeds, refresh the question list.
5. Clear the form.

We use `invalidateQueries()` to tell TanStack Query that the cached question data may be outdated.

```jsx
queryClient.invalidateQueries({
  queryKey: ["questions"],
});
```

This allows the application to fetch updated question data.

**A note about security:** This management page is for demonstrating CRUD operations. It is not protected by administrator authentication, so it should not be treated as a secure admin panel in a deployed application.

---

# Step 12: Add the CSS design

Now let's make QuizMaster look like a modern quiz application.

We'll use simple CSS, including cards, buttons, progress bars, responsive layouts, and different colors for correct and incorrect answers.

### File: `src/index.css`

Replace the existing contents with:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f1f5f9;
  color: #1e293b;
}

button,
input,
select {
  font-family: inherit;
}

button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #818cf8;
  outline-offset: 2px;
}
```

### File: `src/App.css`

Replace the existing contents with:

```css
/* Main layout */

.container {
  max-width: 1100px;
  margin: auto;
  padding: 25px;
}

.center {
  text-align: center;
  padding: 50px 20px;
}

h1,
h2,
h3 {
  color: #1e293b;
}

/* Buttons */

button {
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 11px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

button:hover {
  background: #4338ca;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.secondary {
  background: #64748b;
}

.secondary:hover {
  background: #475569;
}

.danger {
  background: #dc2626;
}

.danger:hover {
  background: #b91c1c;
}

/* Navigation */

.navbar,
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.navbar h1,
.page-header h1 {
  color: #4f46e5;
  margin: 0;
}

.navbar nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Home page */

.hero {
  background: #4f46e5;
  color: white;
  padding: 45px 25px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 30px;
}

.hero h2 {
  color: white;
  font-size: 32px;
}

.hero p {
  color: #e0e7ff;
}

.category-section,
.quiz-section {
  margin-bottom: 35px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-btn {
  background: white;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.category-btn:hover,
.category-btn.active {
  background: #4f46e5;
  color: white;
}

/* Quiz cards */

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.quiz-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.quiz-card h3 {
  margin-bottom: 8px;
}

.quiz-card p {
  color: #64748b;
  line-height: 1.6;
}

.quiz-card button {
  margin-top: auto;
}

.category-label {
  background: #e0e7ff;
  color: #4338ca;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
}

/* Quiz page */

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.timer {
  background: #fee2e2;
  color: #b91c1c;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
}

.question-card {
  background: white;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
}

.question-card > p {
  color: #64748b;
}

.question-progress {
  height: 9px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 25px;
}

.question-progress div {
  height: 100%;
  background: #10b981;
  transition: width 0.3s;
}

/* Answer options */

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 25px 0;
}

.option {
  background: white;
  color: #334155;
  border: 1px solid #cbd5e1;
  text-align: left;
  padding: 15px;
  line-height: 1.5;
}

.option:hover {
  background: #eef2ff;
  color: #4338ca;
}

.option.selected {
  background: #e0e7ff;
  color: #3730a3;
  border: 2px solid #6366f1;
}

.question-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 25px;
}

/* Results */

.result-card {
  background: white;
  padding: 35px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.score-circle {
  width: 150px;
  height: 150px;
  border: 10px solid #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px auto;
}

.score-circle span {
  font-size: 32px;
  font-weight: bold;
  color: #047857;
}

.result-stats {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 25px 0;
}

.result-stats h3 {
  font-size: 26px;
  color: #4f46e5;
}

.result-card button {
  margin: 5px;
}

/* Answer review */

.review-section {
  margin-top: 35px;
}

.review-card {
  background: white;
  padding: 22px;
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 5px solid #64748b;
}

.review-card p {
  line-height: 1.6;
}

.correct-card {
  border-left-color: #10b981;
}

.incorrect-card {
  border-left-color: #ef4444;
}

/* History */

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-card {
  background: white;
  padding: 22px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
}

.history-card p {
  color: #64748b;
}

.history-result {
  text-align: center;
}

.history-result h2 {
  color: #4f46e5;
}

.empty-state {
  text-align: center;
  background: white;
  padding: 35px;
  border-radius: 12px;
}

/* Question management */

.form-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

form label {
  font-size: 14px;
  font-weight: bold;
  color: #475569;
}

input,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  background: white;
}

input:focus,
select:focus {
  outline: none;
  border-color: #6366f1;
}

.question-management {
  margin-top: 30px;
}

.managed-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.managed-question h3 {
  margin-top: 0;
}

.managed-question p {
  color: #64748b;
}

.managed-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Error messages */

.error {
  color: #b91c1c;
  background: #fee2e2;
  padding: 12px;
  border-radius: 8px;
}

/* Responsive design */

@media (max-width: 700px) {
  .container {
    padding: 15px;
  }

  .navbar,
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .quiz-grid {
    grid-template-columns: 1fr;
  }

  .quiz-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .history-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .history-result {
    text-align: left;
  }

  .result-stats {
    gap: 20px;
  }

  .managed-question {
    align-items: flex-start;
    flex-direction: column;
  }

  .question-card {
    padding: 18px;
  }
}
```

Your application now has styling for all five pages.

---

# Step 13: Make one important timer correction

Before running the application, we need to make a small improvement to the quiz timer.

The initial timer code can submit a quiz immediately when the quiz first loads because `timeLeft` starts at zero. We'll fix that by tracking whether the timer has started.

In `QuizPage.jsx`, add this state next to the other state variables:

```jsx
const [timerStarted, setTimerStarted] = useState(false);
```

Replace the timer initialization effect with:

```jsx
useEffect(() => {
  if (quiz && !timerStarted) {
    setTimeLeft(quiz.timeLimit * 60);
    setTimerStarted(true);
  }
}, [quiz, timerStarted]);
```

Then update the countdown timer effect so it checks `timerStarted`:

```jsx
useEffect(() => {
  if (
    !timerStarted ||
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
}, [
  timerStarted,
  timeLeft > 0,
  quiz,
  questions.length,
  quizLoading,
  questionsLoading,
]);
```

Finally, add `timerStarted` to the conditions of the automatic submission effect:

```jsx
useEffect(() => {
  if (
    timerStarted &&
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
  timerStarted,
  timeLeft,
  quiz,
  questions.length,
  quizLoading,
  questionsLoading,
  submitQuiz,
]);
```

Now the quiz won't submit until the timer has actually started and then reached zero.

**Why does this work?**

- `timerStarted` initially equals `false`.
- Once the quiz loads, we set the time limit and mark the timer as started.
- The countdown begins.
- Automatic submission occurs only when the timer has started and the remaining time reaches zero.

---

# Step 14: Run the Complete Application

Now we need to start both the backend and frontend.

Open **two separate terminals** inside the `quizmaster` folder.

### Terminal 1: Start JSON Server

```bash
npx json-server db.json --port 3000
```

Your backend will run at:

`http://localhost:3000`

### Terminal 2: Start React

```bash
npm run dev
```

Open the local address displayed by Vite, usually:

`http://localhost:5173`

You should see the QuizMaster home page with four quiz categories:

- React
- JavaScript
- HTML
- CSS

### Test the complete user flow

Follow these steps to check that the application works.

1. Open the home page.
2. Select the React category.
3. Click **Start Quiz**.
4. Answer the questions.
5. Click **Next Question** to move through the quiz.
6. Submit your answers.
7. Check your score and percentage.
8. Review the correct answers and explanations.
9. Return home and open Quiz History.
10. Open Manage Questions and try adding a question.

After submitting a quiz, the attempt should be saved in `db.json`.

**Important:** Keep both terminals running. JSON Server must remain active while you use the application.

---

# Step 15: Understand the React Hooks Used in This Project

You don't need to memorize everything. Focus on understanding why each hook is used.

## 1. `useState()`

Used to store data that changes.

Example:

```jsx
const [currentIndex, setCurrentIndex] = useState(0);
```

This stores the current question number.

When the user clicks Next Question:

```jsx
setCurrentIndex((index) => index + 1);
```

React updates the state and renders the next question.

**Remember:** `useState` is useful for form inputs, selected answers, timers, and other changing UI data.

## 2. `useEffect()`

Used to perform side effects.

In QuizMaster, we use it to manage the countdown timer.

```jsx
useEffect(() => {
  // Timer logic
}, []);
```

The empty dependency array means the effect runs when the component mounts, although React Strict Mode can run an additional setup and cleanup cycle during development.

When working with timers, remember to clean them up to prevent unnecessary intervals from continuing.

## 3. `useContext()`

Used to share data between components.

We use it to share the selected category.

```jsx
const { selectedCategory } = useQuizContext();
```

The value comes from our `QuizContext.jsx` file.

This avoids passing the same category information through multiple component levels.

## 4. `useRef()`

Used to retain a value between renders without triggering a render when the value changes.

In our quiz page:

```jsx
const timerRef = useRef(null);
```

We store the timer's interval ID so that it can be cleared when necessary.

We also use a ref to help prevent duplicate submissions.

## 5. `useNavigate()`

Used to navigate between pages programmatically.

Example:

```jsx
const navigate = useNavigate();

navigate("/");
```

This returns the user to the home page.

We also use it after submitting the quiz to open the result page.

## 6. `useParams()`

Used to read dynamic values from the URL.

Example:

```jsx
const { quizId } = useParams();
```

For the URL `/quiz/2`, `quizId` is `"2"`.

This allows us to fetch the questions for the selected quiz.

## 7. `useQuery()`

Used to fetch and cache server data.

Example:

```jsx
const { data, isLoading, isError } = useQuery({
  queryKey: ["quizzes"],
  queryFn: getQuizzes,
});
```

Here:

- `data` contains the returned quizzes.
- `isLoading` indicates that the initial request is in progress.
- `isError` indicates that the request failed.
- `queryKey` identifies the cached data.
- `queryFn` performs the API request.

## 8. `useMutation()`

Used to create, update, or delete server data.

Example:

```jsx
const mutation = useMutation({
  mutationFn: saveAttempt,
});
```

When we call:

```jsx
mutation.mutate(attempt);
```

TanStack Query executes `saveAttempt()`, which sends a POST request through Axios.

We use mutations for saving results and managing questions.

## 9. `useMemo()`

Used to cache the result of a calculation between renders when its dependencies have not changed.

Example:

```jsx
const filteredQuizzes = useMemo(() => {
  return quizzes.filter((quiz) => quiz.category === selectedCategory);
}, [quizzes, selectedCategory]);
```

The calculation is repeated when either the quizzes or selected category changes.

For a small quiz application, `useMemo()` isn't necessary for performance, but it is useful to learn.

## 10. `useCallback()`

Used to cache a function reference between renders until its dependencies change.

Example:

```jsx
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);
```

This can be useful when passing functions to memoized child components or using functions as effect dependencies.

**Remember:** Don't add `useMemo()` or `useCallback()` everywhere. Use them when there is a practical reason.

---

# Step 16: Understand How Axios and JSON Server Work Together

Our application demonstrates GET, POST, PATCH, and DELETE requests.

| Operation           | HTTP method | Endpoint              |
| ------------------- | ----------- | --------------------- |
| Get all quizzes     | GET         | `/quizzes`            |
| Get one quiz        | GET         | `/quizzes/1`          |
| Get quiz questions  | GET         | `/questions?quizId=1` |
| Add a question      | POST        | `/questions`          |
| Update a question   | PATCH       | `/questions/1`        |
| Delete a question   | DELETE      | `/questions/1`        |
| Save a quiz attempt | POST        | `/attempts`           |
| Get quiz history    | GET         | `/attempts`           |

### Example: Adding a question

The process is:

1. The user fills out the question form.
2. React collects the question details.
3. `useMutation()` calls the API function.
4. Axios sends a POST request.
5. JSON Server saves the new question.
6. TanStack Query invalidates the cached question data.
7. The application fetches the updated question list.

This demonstrates how a React frontend communicates with a backend API.

---

# Step 17: Features Implemented

Let's compare our project against the original requirements.

| Feature                   | Status |
| ------------------------- | ------ |
| Quiz categories           | ✅     |
| Quiz listing              | ✅     |
| Multiple-choice questions | ✅     |
| Score calculation         | ✅     |
| Countdown timer           | ✅     |
| Result page               | ✅     |
| Answer review             | ✅     |
| Explanations              | ✅     |
| Quiz history              | ✅     |
| Add questions             | ✅     |
| Edit questions            | ✅     |
| Delete questions          | ✅     |
| React Router              | ✅     |
| Axios API integration     | ✅     |
| JSON Server backend       | ✅     |
| TanStack Query            | ✅     |
| Context API               | ✅     |
| Responsive design         | ✅     |

### What can you add next?

To make the project stand out even more, consider these improvements:

1. **Random questions:** Select a random set of questions from a larger question bank.
2. **Performance dashboard:** Display average scores and progress by category.
3. **Difficulty levels:** Add Easy, Medium, and Hard question levels.
4. **User authentication:** Let students sign in and maintain separate quiz histories.
5. **Leaderboard:** Compare scores between users.
6. **Dark mode:** Allow users to switch between light and dark themes.

These are enhancements rather than requirements for your first working version.

---

# Step 18: Common Errors and Solutions

### Error 1: Quiz list is empty

**Possible cause:** JSON Server is not running.

Run:

```bash
npx json-server db.json --port 3000
```

Then refresh the page.

### Error 2: Questions are not displayed

Check that each question has a `quizId` matching the ID of its quiz.

For example:

```json
{
  "id": "1",
  "quizId": "1",
  "question": "What is React?"
}
```

The question belongs to the quiz with ID `1`.

### Error 3: Results are not saved

Check that the `/attempts` endpoint is accessible and that the browser's Network tab shows a successful POST request.

If the POST request fails, the result page won't receive a saved attempt ID.

### Error 4: React shows an import error

Check that your file names and import paths match.

For example:

```jsx
import Home from "./pages/Home";
```

This requires `Home.jsx` to exist inside the `src/pages` directory.

### Error 5: The timer behaves incorrectly

Make sure you applied the timer correction in Step 13.

Also, verify that the interval is cleared when the component unmounts or the quiz is submitted.

### Error 6: Changes in the question manager don't appear immediately

Make sure the mutation's `onSuccess` handler invalidates the appropriate query.

```jsx
queryClient.invalidateQueries({
  queryKey: ["questions"],
});
```

This tells TanStack Query to refresh the cached question data.

---

# Step 19: How to Explain QuizMaster in an Interview

As a fresher, you should be able to describe the project clearly without memorizing every line of code.

### Project name

**QuizMaster – Online Quiz and Assessment Platform**

### Project description

QuizMaster is an interactive quiz application developed using React, Axios, TanStack Query, React Router, and JSON Server.

The application allows users to select quizzes by category, answer multiple-choice questions, complete timed assessments, and view their scores and explanations.

It stores quiz attempts so users can review previous results. It also includes a question management interface that supports creating, editing, and deleting questions.

React hooks manage the application state and timer, while TanStack Query handles API data fetching and mutations. Axios communicates with the JSON Server backend through REST API endpoints.

### Interview questions to prepare for

**1. Why did you use React?**

React makes it easier to build interactive interfaces using components and state.

**2. Why did you use Axios?**

Axios simplifies sending HTTP requests and handling responses from the backend.

**3. What is the difference between `useState()` and `useRef()`?**

`useState()` stores values that affect rendering. Changing a ref does not trigger a re-render.

**4. What is the difference between `useEffect()` and `useMemo()`?**

`useEffect()` is used for side effects, while `useMemo()` caches the result of a calculation.

**5. Why did you use TanStack Query?**

It helps manage server data, including caching, loading states, error states, and mutations.

**6. What is the difference between `useQuery()` and `useMutation()`?**

`useQuery()` is generally used to fetch server data. `useMutation()` is used for operations that change server data, such as creating or deleting a question.

**7. Why did you use React Router?**

React Router allows users to navigate between pages without reloading the entire application.

**8. How is the score calculated?**

The application compares each selected answer with the correct answer, counts the correct responses, and calculates the percentage.

**9. How do you save quiz history?**

After a quiz is submitted, the application sends a POST request to JSON Server. The saved attempt includes the score, percentage, date, and answer review information.

**10. Why did you use Context API?**

Context API allows components to share information, such as the selected quiz category, without passing props through multiple levels.

---

## My recommendation

Since you're a fresher, don't try to memorize the entire project immediately.

Learn it in this order:

1. **React basics:** Understand components, props, `useState()`, and conditional rendering.
2. **API integration:** Understand Axios and the four HTTP methods.
3. **Routing:** Understand `useNavigate()` and `useParams()`.
4. **Quiz logic:** Understand answer selection, scoring, and timers.
5. **TanStack Query:** Learn `useQuery()` and `useMutation()`.
6. **Advanced hooks:** Practice `useContext()`, `useRef()`, `useMemo()`, and `useCallback()`.

**One important note:** JSON Server is suitable for learning and prototyping, but it doesn't provide secure authentication or enforce exam rules. In a production assessment platform, correct answers and scoring should be validated on the backend rather than trusted to the browser.

If you can build this project yourself, explain each function, and demonstrate the full quiz flow, you'll have a strong practical project for a fresher-level React portfolio.
