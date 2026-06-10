const form = document.getElementById("smokingForm");
const entriesList = document.getElementById("entries");
const summary = document.getElementById("summary");

let entries = JSON.parse(localStorage.getItem("smokingEntries")) || [];

function saveEntries() {
  localStorage.setItem("smokingEntries", JSON.stringify(entries));
}

function renderDashboard() {
  entriesList.innerHTML = "";

  if (entries.length === 0) {
    summary.textContent = "No entries yet.";
    return;
  }

  const totalCigarettes = entries.reduce((sum, entry) => sum + entry.cigarettes, 0);
  summary.textContent = `Total entries: ${entries.length} | Total cigarettes: ${totalCigarettes}`;

  entries.slice().reverse().forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} — ${entry.cigarettes} cigarettes | Mood: ${entry.mood || "—"} | Location: ${entry.location || "—"} | People: ${entry.people || "—"} | Note: ${entry.notes || "—"}`;
    entriesList.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const cigarettes = Number(document.getElementById("cigarettes").value);
  const mood = document.getElementById("mood").value.trim();
  const location = document.getElementById("location").value.trim();
  const people = document.getElementById("people").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const entry = {
    date: new Date().toLocaleString(),
    cigarettes,
    mood,
    location,
    people,
    notes
  };

  entries.push(entry);
  saveEntries();
  form.reset();
  renderDashboard();
});

renderDashboard();
