let canvasContainer;
const CM_TO_PX = 4; // 1 cm = 4 pixels (ajustable)

function createCanvas() {
  const width = parseInt(document.getElementById("width").value);
  const height = parseInt(document.getElementById("height").value);
  canvasContainer = document.getElementById("canvas-container");
  canvasContainer.innerHTML = "";
  canvasContainer.style.width = width * CM_TO_PX + "px";
  canvasContainer.style.height = height * CM_TO_PX + "px";
}

function addPiece() {
  const shape = document.getElementById("shape").value;
  const w = parseInt(document.getElementById("w").value) * CM_TO_PX;
  const h = parseInt(document.getElementById("h").value) * CM_TO_PX;
  const color = document.getElementById("color").value;

  const piece = document.createElement("div");
  piece.className = "piece";
  piece.style.backgroundColor = color;
  piece.style.width = w + "px";
  piece.style.height = h + "px";
  piece.style.left = "0px";
  piece.style.top = "0px";
  if (shape === "cercle") {
    piece.style.borderRadius = "50%";
  }
  piece.draggable = true;
  piece.ondragstart = dragStart;
  piece.ondragend = dragEnd;
  piece.onclick = () => {
    if (confirm("Supprimer cette pièce ?")) piece.remove();
  };

  canvasContainer.appendChild(piece);
}

let offsetX, offsetY, dragged;

function dragStart(e) {
  dragged = e.target;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
}

function dragEnd(e) {
  const rect = canvasContainer.getBoundingClientRect();
  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  x = Math.max(0, Math.min(x, canvasContainer.clientWidth - dragged.offsetWidth));
  y = Math.max(0, Math.min(y, canvasContainer.clientHeight - dragged.offsetHeight));

  dragged.style.left = x + "px";
  dragged.style.top = y + "px";

  checkOutOfBounds(dragged);
}

function checkOutOfBounds(piece) {
  const box = piece.getBoundingClientRect();
  const canvasBox = canvasContainer.getBoundingClientRect();
  if (
    box.left < canvasBox.left ||
    box.top < canvasBox.top ||
    box.right > canvasBox.right ||
    box.bottom > canvasBox.bottom
  ) {
    piece.classList.add("out-of-bounds");
  } else {
    piece.classList.remove("out-of-bounds");
  }
}

function exportJSON() {
  const pieces = [...canvasContainer.querySelectorAll(".piece")].map(p => ({
    left: p.style.left,
    top: p.style.top,
    width: p.style.width,
    height: p.style.height,
    color: p.style.backgroundColor,
    borderRadius: p.style.borderRadius || "0"
  }));
  const json = JSON.stringify(pieces, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "decoupe.json";
  a.click();
}

function exportImage() {
  html2canvas(canvasContainer).then(canvas => {
    const link = document.createElement("a");
    link.download = "decoupe.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
