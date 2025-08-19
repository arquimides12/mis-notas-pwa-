// Referencias
const saveBtn = document.getElementById("save-note-btn");
const notesContainer = document.getElementById("notes-container");
const snackbar = document.getElementById("snackbar");

// Referencias al formulario
const noteForm = document.getElementById("note-form");
const noteTitle = document.getElementById("note-title");
const noteText = document.getElementById("note-text");
const addNoteBtn = document.getElementById("add-note-btn");
const closeNoteBtn = document.getElementById("close-note-btn");

// Mostrar formulario al presionar "+"
saveBtn.addEventListener("click", () => {
  noteForm.style.display = "block";
  noteTitle.focus();
});

// Cerrar formulario
closeNoteBtn.addEventListener("click", () => {
  noteForm.style.display = "none";
  noteTitle.value = "";
  noteText.value = "";
});

// Función para agregar card con MDL
function addNoteCard(title, text) {
  const cardHTML = `
    <div class="mdl-cell mdl-cell--4-col">
      <div class="mdl-card mdl-shadow--2dp note-card">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">${title}</h2>
        </div>
        <div class="mdl-card__media">
          <img src="img/opi.jpg" class="img-card" alt="Nota Imagen">
        </div>
        <div class="mdl-card__supporting-text">
          ${text}
        </div>
      </div>
    </div>
  `;
  notesContainer.insertAdjacentHTML("beforeend", cardHTML);

  // Actualizar MDL
  if (componentHandler) componentHandler.upgradeAllRegistered();

  // Mostrar Snackbar
  snackbar.MaterialSnackbar.showSnackbar({
    message: "Nota guardada correctamente"
  });
}

// Evento para guardar nota
addNoteBtn.addEventListener("click", () => {
  const title = noteTitle.value.trim();
  const text = noteText.value.trim();

  if (title === "" || text === "") {
    snackbar.MaterialSnackbar.showSnackbar({
      message: "Completa título y nota"
    });
    return;
  }

  addNoteCard(title, text);

  // Limpiar y cerrar formulario
  noteTitle.value = "";
  noteText.value = "";
  noteForm.style.display = "none";
});

// Registro de Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("✅ Service Worker registrado"))
    .catch(err => console.error("❌ Error registrando SW:", err));
}
