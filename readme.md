# 🧵 Visualiseur de Découpe de Tissu

Une application web pour aider les couturières à visualiser la disposition des pièces sur un tissu donné. Elle permet de créer une zone de tissu, d'ajouter différentes formes de pièces de tissu (rectangle, carré, cercle, triangle) et de les positionner afin de vérifier si la taille du tissu est suffisante.

## 🚀 Fonctionnalités

- 🎨 Ajout de formes : rectangle, carré, cercle, triangle
- 📏 Unités en centimètres (cm)
- 🧱 Affichage du tissu sous forme d’un grand rectangle basé sur les dimensions saisies (en cm)
- 🎯 Positionnement libre des formes sur le tissu
- 🌈 Couleurs personnalisables pour chaque forme
- ➕ Ajout de plusieurs pièces possibles
- ✅ Supprimer une pièce  
  ➤ Permet de retirer une forme ajoutée sur le tissu.
- ✅ Déplacer une pièce (drag & drop)  
  ➤ Déplacer librement les formes sur la surface du tissu à l'aide de la souris.
- ✅ Vérification automatique si une pièce dépasse les bords  
  ➤ Détecte et signale visuellement si une forme sort de la zone du tissu.

## ✨ Fonctionnalités à venir

- ⏳ Optimisation automatique du placement (à venir)  
  ➤ Algorithme pour agencer les pièces automatiquement en minimisant les pertes.
- ⏳ Calcul des chutes de tissu (à venir)  
  ➤ Calcul des zones de tissu inutilisées (chutes), et visualisation.
- ⏳ Sauvegarde / export de la disposition en image ou JSON (à venir)  
  ➤ Possibilité de sauvegarder la disposition actuelle en image (screenshot) ou fichier `.json` pour la réimporter plus tard.

## 🛠️ Comment utiliser

1. Renseigner la largeur et la hauteur du tissu (en cm).
2. Ajouter une ou plusieurs formes à l’aide du formulaire (forme, taille, couleur).
3. Positionner les formes en les déplaçant.
4. Supprimer une pièce si nécessaire.
5. Vérifier visuellement si toutes les pièces rentrent dans le tissu.

## 📁 Structure du projet

- `index.html` – Structure HTML de la page
- `style.css` – Styles pour le tissu, les formes, l’interface
- `script.js` – Gestion de l’ajout, du déplacement, de la suppression, des vérifications de débordement

## 💡 Idées futures

- Import d’un patron PDF et conversion en formes.
- Calcul du coût de la découpe selon la taille du tissu utilisé.
- Partage d’une disposition avec d’autres couturières.

---

🧷 Application pensée pour les couturières, modélistes et créateurs textile souhaitant gagner du temps dans la planification des découpes.

Développé avec ❤️ en JavaScript, HTML et CSS.