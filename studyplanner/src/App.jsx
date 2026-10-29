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
  deleteTask,
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
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

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
          color: "#6366f1",
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
      (task) => String(task.subjectId) === String(id),
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
      estimatedMinutes: Number(estimatedMinutes),
    };

    try {
      if (editingTaskId !== null) {
        await updateTask(editingTaskId, taskData);
      } else {
        await addTask({
          ...taskData,
          status: "Pending",
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
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";

    try {
      await updateTask(task.id, {
        status: newStatus,
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
        filterSubject === "All" || String(task.subjectId) === filterSubject;

      const matchesStatus =
        filterStatus === "All" || task.status === filterStatus;

      const matchesPriority =
        filterPriority === "All" || task.priority === filterPriority;

      return (
        matchesSearch && matchesSubject && matchesStatus && matchesPriority
      );
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  // Find a subject name using its ID
  const getSubjectName = (id) => {
    const subject = subjects.find((item) => String(item.id) === String(id));

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
              onChange={(event) => setSubjectName(event.target.value)}
            />

            <button type="submit">
              {editingSubjectId !== null ? "Update Subject" : "Add Subject"}
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

            {subjects.length === 0 && <p>No subjects added yet.</p>}
          </div>
        </section>

        {/* Task Form */}
        <section className="card">
          <h2>{editingTaskId !== null ? "Edit Task" : "Add New Task"}</h2>

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
              onChange={(event) => setEstimatedMinutes(event.target.value)}
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
                <h3 className={task.status === "Completed" ? "completed" : ""}>
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
                    task.status === "Completed" ? "done" : "pending"
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
                  {task.status === "Completed" ? "Mark Pending" : "Complete"}
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
