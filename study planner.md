# StudyFlow – Personal Study Planner Using React, Axios, and JSON Server

Since you are a fresher, let's build this project **step by step using simple React code**. I'll explain what each file does, why we use it, and how the frontend communicates with the backend.

We will first build the basic application with all four HTTP methods: **GET, POST, PATCH, and DELETE**. Then we will add a dashboard, task filters, and progress tracking.

## 1. What will we build?

Our application, **StudyFlow**, will allow students to:

- Add and view subjects.
- Create study tasks with deadlines.
- Mark tasks as completed or pending.
- Edit and delete tasks.
- Search tasks and filter them by subject, status, and priority.
- View total subjects, pending tasks, and completed tasks.
- Track overall study progress.

### Technologies we will use

| Technology | Purpose |
|---|---|
| React | Build the user interface |
| Axios | Send API requests |
| JSON Server | Create a simple backend API |
| HTML and CSS | Structure and style the application |
| JavaScript | Handle application logic |

### How the application works



Think of the application as three parts:

1. **React frontend:** Displays subjects, tasks, buttons, and the dashboard.
2. **Axios:** Sends requests from React to the backend.
3. **JSON Server:** Stores the subjects and tasks in `db.json` and provides API endpoints.

For example, when you add a task, React sends a `POST` request through Axios. JSON Server saves the task, and React displays it on the screen.

---

# Step 1: Create the React project

First, make sure you have Node.js installed.

Open your terminal and run:

```bash
npm create vite@latest studyflow -- --template react
```

Move into your project folder:

```bash
cd studyflow
```

Install the required packages:

```bash
npm install
```

Install Axios:

```bash
npm install axios
```

Install JSON Server:

```bash
npm install -D json-server
```

Start the React application:

```bash
npm run dev
```

Your terminal will display a local development address. Open that address in your browser.

**What did we do?**

- Vite created our React project.
- Axios will help React communicate with the backend.
- JSON Server will act as our beginner-friendly backend.

Stop the development server using `Ctrl + C` before continuing if necessary.

# Step 2: Create the project files

Inside the `studyflow` folder, arrange your files like this:

```text
studyflow/
│
├── db.json
├── package.json
│
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    └── api.js
```

You don't need to create `package.json` or `main.jsx` manually because Vite creates them. We will modify or use the existing files.

---

# Step 3: Create the backend using JSON Server

Create a file named `db.json` in the main `studyflow` folder, not inside `src`.

### File: `db.json`

```json
{
  "subjects": [
    {
      "id": "1",
      "name": "React",
      "color": "#6366f1"
    },
    {
      "id": "2",
      "name": "JavaScript",
      "color": "#f59e0b"
    },
    {
      "id": "3",
      "name": "Database",
      "color": "#10b981"
    }
  ],
  "tasks": [
    {
      "id": "1",
      "title": "Learn React Hooks",
      "subjectId": "1",
      "dueDate": "2026-10-28",
      "priority": "High",
      "status": "Pending",
      "estimatedMinutes": 60
    },
    {
      "id": "2",
      "title": "Practice JavaScript Arrays",
      "subjectId": "2",
      "dueDate": "2026-10-27",
      "priority": "Medium",
      "status": "Completed",
      "estimatedMinutes": 30
    }
  ]
}
```

### Explanation

JSON Server reads this file and creates API endpoints automatically.

| Endpoint | Purpose |
|---|---|
| `GET /subjects` | Get all subjects |
| `POST /subjects` | Add a subject |
| `PATCH /subjects/1` | Edit a subject |
| `DELETE /subjects/1` | Delete a subject |
| `GET /tasks` | Get all tasks |
| `POST /tasks` | Add a task |
| `PATCH /tasks/1` | Update a task |
| `DELETE /tasks/1` | Delete a task |

The ID `1` identifies a particular record in the example endpoints.

### Start JSON Server

Open a terminal in your project folder and run:

```bash
npx json-server db.json --port 3000
```

Your backend API will be available at:

`http://localhost:3000`

You can test the tasks endpoint by opening `http://localhost:3000/tasks` in your browser.

**Important:** Keep this terminal running. JSON Server must stay active while you use the React application.

---

# Step 4: Create the Axios API service

Instead of writing Axios requests inside every component, we will put them in one separate file.

### File: `src/api.js`

```javascript
import axios from "axios";

// Backend address
const API = "http://localhost:3000";

// ---------------- SUBJECT API ----------------

// GET: Get all subjects
export const getSubjects = async () => {
  const response = await axios.get(`${API}/subjects`);
  return response.data;
};

// POST: Add a new subject
export const addSubject = async (subject) => {
  const response = await axios.post(`${API}/subjects`, subject);
  return response.data;
};

// PATCH: Update a subject
export const updateSubject = async (id, subject) => {
  const response = await axios.patch(
    `${API}/subjects/${id}`,
    subject
  );

  return response.data;
};

// DELETE: Delete a subject
export const deleteSubject = async (id) => {
  await axios.delete(`${API}/subjects/${id}`);
};

// ---------------- TASK API ----------------

// GET: Get all tasks
export const getTasks = async () => {
  const response = await axios.get(`${API}/tasks`);
  return response.data;
};

// POST: Add a new task
export const addTask = async (task) => {
  const response = await axios.post(`${API}/tasks`, task);
  return response.data;
};

// PATCH: Update a task
export const updateTask = async (id, task) => {
  const response = await axios.patch(
    `${API}/tasks/${id}`,
    task
  );

  return response.data;
};

// DELETE: Delete a task
export const deleteTask = async (id) => {
  await axios.delete(`${API}/tasks/${id}`);
};
```

### Understand the code

Consider this function:

```javascript
export const getTasks = async () => {
  const response = await axios.get("http://localhost:3000/tasks");
  return response.data;
};
```

Here is what each part means:

- `export` allows other files to use the function.
- `async` allows us to use `await` inside the function.
- `axios.get()` sends a GET request to the backend.
- `await` waits for the response.
- `response.data` contains the tasks returned by the server.

The other HTTP methods work similarly:

**POST — Add data**

```javascript
await axios.post("http://localhost:3000/tasks", task);
```

**PATCH — Update existing data**

```javascript
await axios.patch("http://localhost:3000/tasks/1", {
  status: "Completed"
});
```

**DELETE — Remove data**

```javascript
await axios.delete("http://localhost:3000/tasks/1");
```

We have now created reusable API functions for both subjects and tasks.

---

# Step 5: Build the React application

Now we will build the main interface.

To keep the project beginner-friendly, we will use one main component instead of splitting the application into many smaller components.

Our component will handle:

1. Fetching data from the backend.
2. Adding subjects and tasks.
3. Editing and deleting subjects and tasks.
4. Marking tasks as completed.
5. Searching and filtering tasks.
6. Calculating dashboard statistics.

### File: `src/App.jsx`

Replace the existing contents of `App.jsx` with this code:

```jsx
import { useEffect, useState } from "react";
import "./App.css";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
  getTasks,
  addTask,
  updateTask,
  deleteTask
} from "./api";

function App() {
  // Store subjects and tasks
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Subject form
  const [subjectName, setSubjectName] = useState("");
  const [editingSubjectId, setEditingSubjectId] = useState(null);

  // Task form
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Search and filters
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  // Error message
  const [error, setError] = useState("");

  // Fetch data from backend
  const loadData = async () => {
    try {
      setError("");

      const subjectData = await getSubjects();
      const taskData = await getTasks();

      setSubjects(subjectData);
      setTasks(taskData);
    } catch (error) {
      setError("Cannot connect to the backend. Please start JSON Server.");
    }
  };

  // Run loadData when the page opens
  useEffect(() => {
    loadData();
  }, []);

  // Calculate dashboard statistics
  const totalSubjects = subjects.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  // Add or update a subject
  const handleSubjectSubmit = async (event) => {
    event.preventDefault();

    const name = subjectName.trim();

    if (!name) {
      alert("Please enter a subject name.");
      return;
    }

    try {
      if (editingSubjectId !== null) {
        await updateSubject(editingSubjectId, { name });
      } else {
        await addSubject({
          name,
          color: "#6366f1"
        });
      }

      setSubjectName("");
      setEditingSubjectId(null);

      await loadData();
    } catch (error) {
      alert("Unable to save subject.");
    }
  };

  // Edit a subject
  const handleEditSubject = (subject) => {
    setSubjectName(subject.name);
    setEditingSubjectId(subject.id);
  };

  // Delete a subject
  const handleDeleteSubject = async (id) => {
    const relatedTasks = tasks.filter(
      (task) => String(task.subjectId) === String(id)
    );

    if (relatedTasks.length > 0) {
      alert("Delete or move this subject's tasks before deleting it.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    try {
      await deleteSubject(id);
      await loadData();
    } catch (error) {
      alert("Unable to delete subject.");
    }
  };

  // Add or update a task
  const handleTaskSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !subjectId || !dueDate) {
      alert("Please fill in all required task fields.");
      return;
    }

    const taskData = {
      title: title.trim(),
      subjectId,
      dueDate,
      priority,
      estimatedMinutes: Number(estimatedMinutes)
    };

    try {
      if (editingTaskId !== null) {
        await updateTask(editingTaskId, taskData);
      } else {
        await addTask({
          ...taskData,
          status: "Pending"
        });
      }

      resetTaskForm();
      await loadData();
    } catch (error) {
      alert("Unable to save task.");
    }
  };

  // Clear task form
  const resetTaskForm = () => {
    setTitle("");
    setSubjectId("");
    setDueDate("");
    setPriority("Medium");
    setEstimatedMinutes(30);
    setEditingTaskId(null);
  };

  // Load an existing task into the form
  const handleEditTask = (task) => {
    setTitle(task.title);
    setSubjectId(String(task.subjectId));
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setEstimatedMinutes(task.estimatedMinutes);
    setEditingTaskId(task.id);
  };

  // Mark a task as completed or pending
  const handleToggleStatus = async (task) => {
    const newStatus =
      task.status === "Completed" ? "Pending" : "Completed";

    try {
      await updateTask(task.id, {
        status: newStatus
      });

      await loadData();
    } catch (error) {
      alert("Unable to update task status.");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);
      await loadData();
    } catch (error) {
      alert("Unable to delete task.");
    }
  };

  // Search, filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSubject =
        filterSubject === "All" ||
        String(task.subjectId) === filterSubject;

      const matchesStatus =
        filterStatus === "All" ||
        task.status === filterStatus;

      const matchesPriority =
        filterPriority === "All" ||
        task.priority === filterPriority;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStatus &&
        matchesPriority
      );
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  // Find a subject name using its ID
  const getSubjectName = (id) => {
    const subject = subjects.find(
      (item) => String(item.id) === String(id)
    );

    return subject ? subject.name : "Unknown Subject";
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>StudyFlow 📚</h1>
          <p>Your personal study planner</p>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      {/* Dashboard */}
      <section className="dashboard">
        <div className="stat-card">
          <h3>Total Subjects</h3>
          <p>{totalSubjects}</p>
        </div>

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>
      </section>

      {/* Progress */}
      <section className="card">
        <h2>Study Progress</h2>

        <div className="progress-info">
          <span>Overall completion</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </section>

      <div className="main-grid">

        {/* Subject Management */}
        <section className="card">
          <h2>Manage Subjects</h2>

          <form onSubmit={handleSubjectSubmit}>
            <input
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(event) =>
                setSubjectName(event.target.value)
              }
            />

            <button type="submit">
              {editingSubjectId !== null
                ? "Update Subject"
                : "Add Subject"}
            </button>

            {editingSubjectId !== null && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setSubjectName("");
                  setEditingSubjectId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>

          <div className="subject-list">
            {subjects.map((subject) => (
              <div className="subject-item" key={subject.id}>
                <span>{subject.name}</span>

                <div>
                  <button
                    className="small-btn"
                    onClick={() => handleEditSubject(subject)}
                  >
                    Edit
                  </button>

                  <button
                    className="small-btn danger"
                    onClick={() => handleDeleteSubject(subject.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {subjects.length === 0 && (
              <p>No subjects added yet.</p>
            )}
          </div>
        </section>

        {/* Task Form */}
        <section className="card">
          <h2>
            {editingTaskId !== null ? "Edit Task" : "Add New Task"}
          </h2>

          <form onSubmit={handleTaskSubmit}>
            <label>Task Title</label>

            <input
              type="text"
              placeholder="Example: Learn React Hooks"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label>Subject</label>

            <select
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              required
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
            />

            <label>Priority</label>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label>Estimated Study Time (minutes)</label>

            <input
              type="number"
              min="1"
              value={estimatedMinutes}
              onChange={(event) =>
                setEstimatedMinutes(event.target.value)
              }
              required
            />

            <button type="submit">
              {editingTaskId !== null ? "Update Task" : "Add Task"}
            </button>

            {editingTaskId !== null && (
              <button
                type="button"
                className="secondary"
                onClick={resetTaskForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>
      </div>

      {/* Task List */}
      <section className="card">
        <h2>My Study Tasks</h2>

        {/* Search and Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={filterSubject}
            onChange={(event) => setFilterSubject(event.target.value)}
          >
            <option value="All">All Subjects</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(event) => setFilterPriority(event.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Display Tasks */}
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <div className="task-details">
                <h3
                  className={
                    task.status === "Completed" ? "completed" : ""
                  }
                >
                  {task.title}
                </h3>

                <p>Subject: {getSubjectName(task.subjectId)}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Study Time: {task.estimatedMinutes} minutes</p>

                <span className={`badge ${task.priority.toLowerCase()}`}>
                  {task.priority} Priority
                </span>

                <span
                  className={`badge ${
                    task.status === "Completed"
                      ? "done"
                      : "pending"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="task-actions">
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="small-btn"
                >
                  {task.status === "Completed"
                    ? "Mark Pending"
                    : "Complete"}
                </button>

                <button
                  onClick={() => handleEditTask(task)}
                  className="small-btn"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="small-btn danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p>No tasks found. Try adding a task or changing the filters.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
```

---

# Step 6: Design the application using CSS

Now we will make the application look clean and professional.

You don't need to learn advanced CSS for this project. We will use simple CSS properties such as `display: grid`, `padding`, `margin`, `border-radius`, and `box-shadow`.

### File: `src/App.css`

Replace the existing contents with:

```css
/* Main application */

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.header h1 {
  margin: 0;
  color: #4f46e5;
  font-size: 32px;
}

.header p {
  color: #64748b;
  margin-top: 8px;
}

/* Dashboard cards */

.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 22px;
}

.stat-card {
  background: white;
  padding: 22px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #6366f1;
}

.stat-card h3 {
  margin: 0;
  color: #64748b;
  font-size: 15px;
}

.stat-card p {
  font-size: 30px;
  font-weight: bold;
  margin: 15px 0 0;
  color: #1e293b;
}

/* Common cards */

.card {
  background: white;
  padding: 24px;
  margin-bottom: 22px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #1e293b;
  font-size: 21px;
}

/* Forms */

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}

input,
select {
  width: 100%;
  padding: 11px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  background: white;
  color: #1e293b;
}

input:focus,
select:focus {
  outline: none;
  border-color: #6366f1;
}

/* Buttons */

button {
  padding: 11px 15px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

button:hover {
  background: #4338ca;
}

.secondary {
  background: #64748b;
}

.secondary:hover {
  background: #475569;
}

.small-btn {
  padding: 7px 10px;
  font-size: 12px;
}

.danger {
  background: #ef4444;
}

.danger:hover {
  background: #dc2626;
}

/* Main content layout */

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  align-items: start;
}

/* Subject list */

.subject-list {
  margin-top: 22px;
}

.subject-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 13px 0;
  border-bottom: 1px solid #e2e8f0;
}

.subject-item > div {
  display: flex;
  gap: 7px;
}

.subject-item span {
  font-weight: 600;
}

/* Progress bar */

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #475569;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #10b981;
  border-radius: 10px;
  transition: width 0.3s;
}

/* Search and filters */

.filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 22px;
}

/* Tasks */

.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.task-details {
  flex: 1;
  min-width: 0;
}

.task-details h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1e293b;
}

.task-details p {
  color: #64748b;
  font-size: 14px;
  margin: 7px 0;
}

.completed {
  text-decoration: line-through;
  color: #94a3b8 !important;
}

.task-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: flex-end;
}

/* Status and priority labels */

.badge {
  display: inline-block;
  padding: 5px 9px;
  margin: 5px 5px 0 0;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.high {
  background: #fee2e2;
  color: #b91c1c;
}

.medium {
  background: #fef3c7;
  color: #92400e;
}

.low {
  background: #dcfce7;
  color: #166534;
}

.done {
  background: #d1fae5;
  color: #065f46;
}

.pending {
  background: #dbeafe;
  color: #1d4ed8;
}

/* Error message */

.error {
  padding: 12px;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Responsive design for mobile */

@media (max-width: 800px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }

  .main-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    grid-template-columns: 1fr 1fr;
  }

  .task-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .task-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .app {
    padding: 12px;
  }

  .dashboard {
    gap: 10px;
  }

  .stat-card {
    padding: 14px;
  }

  .stat-card p {
    font-size: 24px;
  }

  .card {
    padding: 16px;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .subject-item {
    align-items: flex-start;
  }
}
```

### File: `src/index.css`

Replace its contents with:

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

### What does this CSS do?

- `grid-template-columns: repeat(4, 1fr)` displays four dashboard cards in one row on larger screens.
- `border-radius` rounds the corners of cards and buttons.
- `box-shadow` gives cards a subtle shadow.
- `display: flex` arranges buttons and task details.
- `@media` adjusts the layout for smaller screens.
- `transition` makes progress-bar changes smoother.

Your application now has a responsive dashboard and task management interface.

---

# Step 7: Check your React entry point

Vite normally creates `src/main.jsx` automatically.

Make sure it contains:

### File: `src/main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

This file loads the main `App` component into the HTML page.

**Simple explanation:**

- `createRoot()` tells React where to display the application.
- `App` is our main application component.
- `index.css` provides the global styles.
- `StrictMode` helps identify certain problems during development.

---

# Step 8: Run the complete application

Now we need to run both the backend and frontend.

You need **two separate terminals**.

### Terminal 1: Start the backend

Open your terminal inside the `studyflow` folder and run:

```bash
npx json-server db.json --port 3000
```

The backend will run at:

`http://localhost:3000`

### Terminal 2: Start the React frontend

Open another terminal in the same folder and run:

```bash
npm run dev
```

Open the local address displayed in the terminal, usually:

`http://localhost:5173`

You should now see your StudyFlow application!

**Important:** Keep both terminals running. If either server stops, part of the application will stop working.

---

# Step 9: Understand how the application works

Let's understand the important React concepts in our project. These are useful when explaining your project in an interview.

## 1. What is `useState`?

Example:

```jsx
const [tasks, setTasks] = useState([]);
```

`useState` stores data that can change while the application is running.

Here:

- `tasks` contains the current list of tasks.
- `setTasks` updates that list.
- `[]` is the initial value, an empty array.

When you call:

```jsx
setTasks(taskData);
```

React updates the state and renders the component again so the screen reflects the new data.

**In simple words:** `useState` helps React remember information.

## 2. What is `useEffect`?

Our application contains:

```jsx
useEffect(() => {
  loadData();
}, []);
```

This tells React to run `loadData()` when the component mounts.

The empty dependency array, `[]`, means the effect does not rerun just because the component renders again.

The `loadData()` function fetches subjects and tasks from JSON Server.

**In simple words:** `useEffect` helps us perform operations such as fetching data when a component loads.

## 3. How does adding a task work?

Consider this code:

```jsx
const handleTaskSubmit = async (event) => {
  event.preventDefault();

  const taskData = {
    title: title,
    subjectId: subjectId,
    dueDate: dueDate,
    priority: priority,
    estimatedMinutes: Number(estimatedMinutes)
  };

  await addTask({
    ...taskData,
    status: "Pending"
  });

  await loadData();
};
```

The process is:

1. The user enters task information.
2. `event.preventDefault()` prevents the browser from reloading the page.
3. We create an object containing the task details.
4. `addTask()` sends a POST request through Axios.
5. JSON Server saves the task.
6. `loadData()` fetches the updated task list.
7. React displays the new task.

This is an example of how the frontend communicates with the backend.

## 4. How does task completion work?

Consider:

```jsx
const handleToggleStatus = async (task) => {
  const newStatus =
    task.status === "Completed" ? "Pending" : "Completed";

  await updateTask(task.id, {
    status: newStatus
  });

  await loadData();
};
```

If the current status is `Pending`, the new status becomes `Completed`.

If the current status is `Completed`, the new status becomes `Pending`.

Axios sends a PATCH request to update the existing record.

We use PATCH rather than POST because we are changing an existing task, not creating a new one.

## 5. How is the progress percentage calculated?

This is an important part of the project.

```jsx
const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

const progress =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);
```

Let's assume you have five tasks:

- Three completed tasks.
- Two pending tasks.

The calculation is:

\[
\text{Progress} = \frac{3}{5} \times 100 = 60\%
\]

The dashboard displays **60% progress**.

If there are no tasks, the progress is set to 0% to prevent division by zero.

The percentage updates automatically when you add, delete, or complete a task because it is calculated from the current task list.

---

# Step 10: Understand the filtering logic

Our application supports searching and filtering without reloading the page.

Consider this code:

```jsx
const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    filterStatus === "All" ||
    task.status === filterStatus;

  return matchesSearch && matchesStatus;
});
```

Suppose you have these tasks:

| Task | Status |
|---|---|
| Learn React Hooks | Completed |
| Practice JavaScript | Pending |
| Build React Project | Pending |

If the user selects `Pending`, only the following tasks appear:

- Practice JavaScript
- Build React Project

The original task list is not deleted or changed. We simply display the records that match the selected conditions.

Our complete code also filters by subject and priority and sorts tasks by due date.

**Why is this useful?**

It demonstrates that you can work with arrays, use JavaScript's `filter()` method, and dynamically update a React interface.

---

# Step 11: Test all four HTTP methods

After starting your application, test the following operations.

| Action | HTTP method | Expected result |
|---|---|---|
| Open the application | GET | Existing subjects and tasks appear |
| Add a subject | POST | The new subject appears |
| Edit a subject | PATCH | The subject name changes |
| Delete an unused subject | DELETE | The subject is removed |
| Add a task | POST | The task appears in the task list |
| Edit a task | PATCH | The task details change |
| Complete a task | PATCH | Its status changes to Completed |
| Delete a task | DELETE | The task disappears |

You can also check your `db.json` file to see how the records change.

**Note:** The application intentionally prevents deleting a subject while it has associated tasks. Delete those tasks first. In a more advanced version, you could instead allow the user to move tasks to another subject.

---

# Step 12: Features implemented in this version

Here is a checklist of what we have built.

| Feature | Status |
|---|---|
| React frontend | ✅ |
| Axios API service | ✅ |
| JSON Server backend | ✅ |
| Add subjects | ✅ |
| Edit subjects | ✅ |
| Delete subjects | ✅ |
| Add tasks | ✅ |
| Edit tasks | ✅ |
| Delete tasks | ✅ |
| Mark tasks completed or pending | ✅ |
| Set task deadlines | ✅ |
| Set task priorities | ✅ |
| Dashboard statistics | ✅ |
| Dynamic progress percentage | ✅ |
| Search tasks | ✅ |
| Filter by subject | ✅ |
| Filter by status | ✅ |
| Filter by priority | ✅ |
| Sort tasks by due date | ✅ |
| Responsive layout | ✅ |
| Pomodoro timer | Not implemented yet |
| Weekly progress chart | Not implemented yet |
| Dark mode | Not implemented yet |

This version covers the essential requirements of your project. You can add the remaining features later.

---

# Step 13: Common errors and how to fix them

### Error 1: Cannot connect to the backend

**Possible reason:** JSON Server is not running.

**Solution:** Open a terminal and run:

```bash
npx json-server db.json --port 3000
```

### Error 2: Axios returns a network error

Check that:

1. JSON Server is running on port `3000`.
2. Your `db.json` file is in the main project folder.
3. The API address in `api.js` is correct.
4. Your computer can access both local development servers.

### Error 3: The page is blank

Check the browser console for errors.

Make sure:
- `App.jsx` imports `./App.css`.
- `main.jsx` imports `./index.css`.
- `App.jsx` imports the correct functions from `./api`.
- All filenames and import paths match.

### Error 4: You cannot add a task

Make sure you have added at least one subject first. Each task needs a subject.

### Error 5: Your changes do not appear

Check whether the relevant API request succeeded in the browser's developer tools.

You can open developer tools using `F12`, then select the **Network** tab to inspect API requests.

---

# Step 14: How to explain this project in an interview

As a fresher, you should be able to explain what you built and why you used each technology.

Here is a simple project description you can use to prepare:

**Project name:** StudyFlow – Personal Study Planner

**Project description:**

StudyFlow is a personal study management application developed using React, Axios, and JSON Server. It allows students to manage subjects, create study tasks, set deadlines, assign priorities, and track their study progress.

The application uses React hooks such as `useState` and `useEffect` to manage state and fetch data. Axios handles communication between the frontend and the JSON Server backend using GET, POST, PATCH, and DELETE requests.

The dashboard calculates task statistics and completion percentages dynamically. Users can search, filter, and sort tasks without reloading the page.

### Questions an interviewer might ask

**1. Why did you use React?**

React helps us build reusable UI components and update the interface when application data changes.

**2. Why did you use Axios?**

Axios makes it easy to send HTTP requests to the backend and process the responses.

**3. What is JSON Server?**

JSON Server is a tool that creates a simple REST API from a JSON file. It is useful for learning backend communication without building a complete backend from scratch.

**4. What is the difference between POST and PATCH?**

POST creates a new resource, whereas PATCH updates selected fields of an existing resource.

**5. What is CRUD?**

CRUD stands for Create, Read, Update, and Delete. These are the four basic operations used to manage data.

**6. How do you calculate progress?**

I divide the number of completed tasks by the total number of tasks and multiply the result by 100.

**7. Why did you separate API functions into `api.js`?**

It keeps API requests separate from UI logic, making the code easier to understand, reuse, and maintain.

---

## My recommendation

Since you are a fresher, **first make sure this version works before adding more features**.

Follow this order:

1. Run the React frontend and JSON Server.
2. Test adding, editing, and deleting subjects.
3. Test adding, editing, completing, and deleting tasks.
4. Verify that the dashboard statistics update correctly.
5. Test search and filters.
6. Add the Pomodoro timer.
7. Add a weekly progress chart.
8. Add dark mode.

Once the basic application works, you can gradually improve the design and functionality without making the code too difficult to understand.

**One final point:** JSON Server is appropriate for a learning project, but it is not a complete production backend. If you later want authentication, multiple users, and stronger data validation, you can replace it with a backend such as Node.js with Express or Django REST Framework.