import React, { useEffect, useState } from "react";
import {
  addSubject,
  addTasks,
  deleteSubject,
  deleteTask,
  getSubjects,
  getTasks,
  updateSubject,
  updateTask,
} from "./api";

const App = () => {
  const [subjecs, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [estimateMinutes, setEstimatedMinutes] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      const subjectData = await getSubjects();
      const taskData = await getTasks();
      setSubjects(subjectData);
      setTasks(taskData);
    } catch (error) {
      setError("Cannot connect to the backend. start JSON Server");
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Study Planner</h1>
          <p>Your personal study planner</p>
        </div>
      </header>
      {error && <p className="error">{error}</p>}
      <section className="dashboard">
        {/* <div className="stat-card">
          <h3>Total Subjects</h3>
          <p>{totalSubjects}</p>
        </div> */}
      </section>
      <section className="card">
        <h2>Manage Subjects</h2>
        <form onSubmit={handleSubjectSubmit}>
          <input
            type="text"
            placeholder="Enter Subject name"
            value={subjectName}
            onChange={(event) => {
              setSubjectName(event.target.value);
            }} git 
          />
        </form>
      </section>
    </div>
  );
};

export default App;
