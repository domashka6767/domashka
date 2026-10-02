let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const subject = document.getElementById("subject").value.trim();
  const task = document.getElementById("task").value.trim();
  const date = document.getElementById("date").value;

  if (!subject || !task || !date) {
    alert("Заполни все поля!");
    return;
  }

  tasks.push({ id: Date.now
(), subject, task, date, done: false });
  save();
  render();

  document.getElementById("subject").value = "";
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleDone(id) {
  tasks = tasks.map
(t => t.id
 === id ? { ...t, done: !t.done } : t);
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id
 !== id);
  save();
  render();
}

function getColor(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(dateStr);
  const days = Math.ceil((due - today) / (1000*60*60*24));
  if (days <= 1) return "red";
  if (days <= 3) return "yellow";
  return "green";
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks
    .sort((a, b) => new Date(a.date
) - new Date(b.date
))
    .forEach(t => {
      const color = getColor(t.date
);
      const div = document.createElement("div");
      div.className = `card ${color} ${t.done ? "done" : ""}`;
      div.innerHTML = `
        <div>
          <b>${t.subject}</b><br>
          <small>${t.task}</small><br>
          <small>📅 до ${t.date
}</small>
        </div>
        <div class="actions">
          <button onclick="toggleDone(${t.id
})">${t.done ? "↩️" : "✅"}</button>
          <button onclick="deleteTask(${t.id
})">🗑️</button>
        </div>
      `;
      list.appendChild(div);
    });
}

render();