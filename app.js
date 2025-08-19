// Referencias
const saveBtn = document.getElementById("save-note-btn");
const noteText = document.getElementById("note-text");
const notesContainer = document.getElementById("notes-container");
const snackbar = document.getElementById("snackbar");

// Función para crear tarjeta de nota
function addNoteCard(text) {
  const cardHTML = `
    <div class="mdl-cell mdl-cell--4-col">
      <div class="mdl-card mdl-shadow--2dp note-card">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Nueva Nota</h2>
        </div>
        <div class="mdl-card__media">
          <img src="https://redestel-ugt.espe.edu.ec/wp-content/uploads/2019/08/Espe-Std.jpg" class="img-card" alt="ESPE">
        </div>
        <div class="mdl-card__supporting-text">
          ${text}
        </div>
      </div>
    </div>
  `;
  notesContainer.insertAdjacentHTML("beforeend", cardHTML);

  // Actualizar MDL para nuevos elementos
  componentHandler.upgradeAllRegistered();

  // Mostrar snackbar
  snackbar.MaterialSnackbar.showSnackbar({
    message: "Nota guardada correctamente"
  });
}

// Evento del botón +
saveBtn.addEventListener("click", () => {
  const text = noteText.value.trim();
  if (text !== "") {
    addNoteCard(text);
    noteText.value = "";
  } else {
    snackbar.MaterialSnackbar.showSnackbar({
      message: "Escribe algo antes de guardar"
    });
  }
});

// Registro de Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("✅ Service Worker registrado"))
    .catch(err => console.error("❌ Error registrando SW:", err));
}
