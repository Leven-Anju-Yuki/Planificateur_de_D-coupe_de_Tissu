let tissuDiv;
// Tableau de couleurs pastel pour les formes
const couleursPastel = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "CDC1FF"];
const CM_TO_PX = 4; // 1 cm = 4 pixels (ajustable)

// Crée le tissu selon les dimensions saisies
function createTissu() {
    const width = parseFloat(document.getElementById("largeur").value);
    const height = parseFloat(document.getElementById("hauteur").value);
    tissuDiv = document.getElementById("tissu");
    tissuDiv.innerHTML = "";
    tissuDiv.style.width = width * CM_TO_PX + "px";
    tissuDiv.style.height = height * CM_TO_PX + "px";
    tissuDiv.tabIndex = 0; // Pour capter les touches clavier
    tissuDiv.focus();
}

// Ajoute une forme sur le tissu
function ajouterForme() {
    const forme = document.getElementById("forme").value;
    const l = parseFloat(document.getElementById("formLargeur").value) * CM_TO_PX;
    const h = parseFloat(document.getElementById("formHauteur").value) * CM_TO_PX;
    const nom = document.getElementById("formNom").value || forme;
    const couleur = couleursPastel[Math.floor(Math.random() * couleursPastel.length)];

    const elem = document.createElement("div");
    elem.className = "shape";
    elem.style.background = couleur;
    elem.style.left = "0px";
    elem.style.top = "0px";

    // Définition des styles selon la forme choisie
    if (forme === "carre") {
        elem.style.width = elem.style.height = l + "px";
    } else if (forme === "rectangle") {
        elem.style.width = l + "px";
        elem.style.height = h + "px";
    } else if (forme === "cercle") {
        elem.style.width = l + "px";
        elem.style.height = l + "px";
        elem.style.borderRadius = "50%";
    } else if (forme === "triangle") {
        elem.style.width = "0";
        elem.style.height = "0";
        elem.style.borderLeft = l / 2 + "px solid transparent";
        elem.style.borderRight = l / 2 + "px solid transparent";
        elem.style.borderBottom = h + "px solid " + couleur;
        elem.style.background = "none";
    }

    makeDraggable(elem); // Rendre la forme déplaçable à la souris
    ajouterClavier(elem); // Permettre le déplacement au clavier
    tissuDiv.appendChild(elem); // Ajouter la forme au tissu
    ajouterALaListe(nom, elem); // Ajouter la forme à la liste
    verifierDepassement(elem); // Vérifier si la forme dépasse du tissu
}

// Ajoute la forme à la liste des formes avec un bouton de suppression
function ajouterALaListe(nom, element) {
    const ul = document.getElementById("liste-formes");
    const li = document.createElement("li");
    li.textContent = nom;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
        element.remove();
        li.remove();
    };
    li.appendChild(btn);
    ul.appendChild(li);
}

// Rend un élément déplaçable à la souris
function makeDraggable(el) {
    let offsetX, offsetY;
    el.addEventListener("mousedown", (e) => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        el.focus();
        function onMouseMove(e) {
            el.style.left = e.pageX - tissuDiv.offsetLeft - offsetX + "px";
            el.style.top = e.pageY - tissuDiv.offsetTop - offsetY + "px";
            verifierDepassement(el);
        }
        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
    el.tabIndex = 0;
    el.classList.add("draggable");
}

// Permet le déplacement de la forme au clavier (flèches)
function ajouterClavier(el) {
    el.addEventListener("keydown", (e) => {
        const step = 1;
        const top = parseInt(el.style.top);
        const left = parseInt(el.style.left);
        if (e.key === "ArrowUp") el.style.top = top - step + "px";
        else if (e.key === "ArrowDown") el.style.top = top + step + "px";
        else if (e.key === "ArrowLeft") el.style.left = left - step + "px";
        else if (e.key === "ArrowRight") el.style.left = left + step + "px";
        verifierDepassement(el);
    });
}

// Vérifie si la forme dépasse du tissu et ajoute une classe si c'est le cas
function verifierDepassement(el) {
    const r = el.getBoundingClientRect();
    const parent = tissuDiv.getBoundingClientRect();
    if (
        r.left < parent.left ||
        r.top < parent.top ||
        r.right > parent.right ||
        r.bottom > parent.bottom
    ) {
        el.classList.add("outside");
    } else {
        el.classList.remove("outside");
    }
}

// Exporte le tissu en image PNG
function exporterImage() {
    html2canvas(tissuDiv).then((canvas) => {
        const link = document.createElement("a");
        link.download = "decoupe-tissu.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Exporte la configuration des formes en JSON
function exporterJSON() {
    const formes = Array.from(tissuDiv.children)
        .filter((c) => c.classList.contains("shape"))
        .map((el) => {
            return {
                left: el.style.left,
                top: el.style.top,
                width: el.style.width,
                height: el.style.height,
                type: el.className,
                background: el.style.background,
            };
        });
    const blob = new Blob([JSON.stringify(formes, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decoupe-tissu.json";
    link.click();
}
// Détection des boutons mobiles
const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

upArrow.addEventListener("click", function () {
    wolfY = Math.max(wolfY - 30, 0);
    wolf.style.top = `${wolfY}px`;
});

downArrow.addEventListener("click", function () {
    wolfY = Math.min(wolfY + 30, gameScreenRect.height - wolf.offsetHeight);
    wolf.style.top = `${wolfY}px`;
});

leftArrow.addEventListener("click", function () {
    wolfX = Math.max(wolfX - 30, 0);
    wolf.style.left = `${wolfX}px`;
});

rightArrow.addEventListener("click", function () {
    wolfX = Math.min(wolfX + 30, gameScreenRect.width - wolf.offsetWidth);
    wolf.style.left = `${wolfX}px`;
});
