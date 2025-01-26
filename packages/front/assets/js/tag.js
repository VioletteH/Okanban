import { getTags, getTagsOfCard, associateTagToCard, dissociateTagToCard } from "./api/tags.api.js";
import {displayCardsInList} from "./card.js"

// AFFICHAGE DES TAGS

export async function displayTags(tagsContainer, cardTagsIds) {

  // Création des tags

  const tags = await getTags(); 
  tagsContainer.innerHTML = ''; 

  tags.forEach(tag => {
    const tagButton = document.createElement("button");
    tagButton.textContent = tag.name;
    tagButton.type = "button";
    tagButton.classList.add("tag", "mr-3");
    tagButton.dataset.tagId = tag.id;
    tagButton.style.backgroundColor = tag.color;
    tagButton.style.color = "white";
    tagsContainer.appendChild(tagButton)
  })

  // Mise en avant des tags déjà associé à une carte (modale "edit card")

  const tagButtons = tagsContainer.querySelectorAll(".tag");

  tagButtons.forEach(tagButton => {
    const tagId = Number(tagButton.dataset.tagId); 
    if (cardTagsIds.includes(tagId)) {
      tagButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.4)";
      tagButton.style.transform = "scale(1.1)";
      tagButton.style.transition = "all 0.2s ease";
      tagButton.classList.add("select");
    }
  });

  // Toggle des tags au clic (modale "add card" et "edit card")

  tagButtons.forEach(tagButton => {
    tagButton.addEventListener("click", async (event) => {
      event.preventDefault();
      if(tagButton.classList.contains("select")){
        tagButton.classList.remove("select");
        tagButton.style.boxShadow = "none";
        tagButton.style.transform = "scale(1)";
      }else{
        tagButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.4)";
        tagButton.style.transform = "scale(1.1)";
        tagButton.style.transition = "all 0.2s ease";
        tagButton.classList.add("select");
      }
    })
  })
  
};

// AJOUT ET SUPPRESSION DES TAGS SUR UNE CARTE

export async function addAndRemoveTagsOfCard(card, tagsContainer) {

  const selectedTags = document.querySelectorAll(".tag.select");
  const selectedTagsIds = Array.from(selectedTags).map(tag => Number(tag.dataset.tagId));

  const cardTags = await getTagsOfCard(card.id);
  const cardTagIds = cardTags.map(tag => tag.id);

  // Association - dissociation des tags sélectionnés avec la carte 
  // Gestion si aucun tag n'est sélectionné
  if (selectedTagsIds.length === 0) {
    for (let tagId of cardTagIds) {
      await dissociateTagToCard(card.id, tagId);
    }
  } else {
    for (let tagId of selectedTagsIds) {
      if (!cardTagIds.includes(tagId)) {
        await associateTagToCard(card.id, tagId);
      }
    }

    // Suppression des tags qui ne sont plus sélectionnés
    for (let tagId of cardTagIds) {
      if (!selectedTagsIds.includes(tagId)) {
        await dissociateTagToCard(card.id, tagId);
      }
    }
  }

  // Actualisation de l'affichage des tags après les modifications
  const updatedCardTags = await getTagsOfCard(card.id);
  const updatedCardTagIds = updatedCardTags.map(tag => tag.id);
  await displayTags(tagsContainer, updatedCardTagIds);
  await displayCardsInList(card.list_id);

  console.log("Mise à jour terminée !");
}
