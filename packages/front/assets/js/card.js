import { getCards, createCard, updateCard, deleteCard, updateCardPosition } from "./api/cards.api.js";
import { getTagsOfCard } from "./api/tags.api.js";
import { displayTags, addAndRemoveTagsOfCard } from "./tag.js";

const addCardModalElement = document.querySelector("#add-card-modal");
const editCardModalElement = document.querySelector("#edit-card-modal");
const editCardTitleElement = document.querySelector("#edit-card-title");
const deleteCardModalElement = document.querySelector("#delete-card-modal");

const closeEditCardModalElements = document.querySelectorAll(".close-edit-card");
const closeDeleteCardModalElements = document.querySelectorAll(".close-delete-card");

const addCardFormElement = document.querySelector("#add-card-form");
const updateCardFormElement = document.querySelector("#edit-card-form");
const deleteCardFormElement = document.querySelector("#delete-card-form");

const cardTemplateElement = document.querySelector("#card-template");

// INSERTION DANS LE DOM

export async function insertCardInDom(card, listElement) {

  // Clone du template card

  const cloneTemplate = cardTemplateElement.content.cloneNode(true);

  const cardTitleElement = cloneTemplate.querySelector("[slot='card-title']");
  cardTitleElement.textContent = card.title;

  const cardIdElement = cloneTemplate.querySelector("[slot='card-id']");
  cardIdElement.dataset.id = card.id;
  cardIdElement.dataset.listId = card.list_id;

  // Ajout des tags à la card

  const tagContainerElement = cloneTemplate.querySelector(".card-header-tag");
  tagContainerElement.innerHTML = "";  

  const tags = await getTagsOfCard(card.id);  
  for (let tag of tags) {
      const tagElement = document.createElement("span");
      tagElement.classList.add("tag", "is-black", "mt-3");
      tagElement.textContent = tag.name;
      tagElement.style.backgroundColor = tag.color;
      tagContainerElement.appendChild(tagElement);
  }

  // Ouverture - fermeture modale "edit card"

  const openEditCardModalElement = cloneTemplate.querySelector("[slot='edit-card-button']");

  openEditCardModalElement.addEventListener("click", async (event) => {
    event.preventDefault();
    editCardModalElement.showModal();
    editCardModalElement.dataset.id = card.id;
    editCardModalElement.dataset.listId = card.list_id;
    editCardTitleElement.value = card.title; 

    const tagsContainer = document.querySelector("#edit-card-tags-container"); 
    const cardTags = await getTagsOfCard(card.id);
    const cardTagsId = cardTags.map(tag => tag.id);
    displayTags(tagsContainer, cardTagsId);
  });
  
  for (let closeEditCardModalElement of closeEditCardModalElements) {
    closeEditCardModalElement.addEventListener("click", async (event) => {
      event.preventDefault();
      editCardModalElement.close();
    });
  }

  // Ouverture - fermeture modale "delete card"

  const openDeleteCardModalElement = cloneTemplate.querySelector("[slot='delete-card-button']");

  openDeleteCardModalElement.addEventListener("click", async (event) => {
    event.preventDefault();
    deleteCardModalElement.showModal();
    deleteCardModalElement.dataset.id = card.id;
    deleteCardModalElement.dataset.listId = card.list_id;
  });

  for (let closeDeleteCardModalElement of closeDeleteCardModalElements) {
    closeDeleteCardModalElement.addEventListener("click", async (event) => {
      event.preventDefault();
      deleteCardModalElement.close();
    });
  }

  // Ajout de la card dans la liste
  listElement.appendChild(cloneTemplate);
};

// AFFICHAGE DES CARDS

export async function displayCardsInList(listId) {

  const cards = await getCards(); 

  const listElement = document.querySelector(`.list-id[data-id='${listId}'] [slot='list-content']`);
  listElement.innerHTML = "";  

  for (let card of cards) {
      if (card.list_id === listId) { 
        await insertCardInDom(card, listElement);
      }

    Sortable.create(listElement, {
      onEnd(event) {
        const movedListElement = event.item; 
        const newPosition = Array.from(listElement.children).indexOf(movedListElement) + 1; 
        updateCardPosition(movedListElement, newPosition);
      },
    });

  };
};

// CREATION D'UNE TACHE

export async function createCardForm() {

  addCardFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(addCardFormElement);
    const currentListId = addCardModalElement.dataset.listId;
    const newCardTitle = data.get("title");
    const newCard = await createCard({title: newCardTitle, list_id: currentListId});

    const tagsContainer = document.querySelector("#add-card-tags-container"); 
    addAndRemoveTagsOfCard(newCard, tagsContainer);

    const listElement = document.querySelector(`.list-id[data-id='${currentListId}'] [slot='list-content']`);
    await insertCardInDom(newCard, listElement);

    addCardModalElement.close();
    addCardFormElement.reset();
  });
};

// MODIFICATION D'UNE TACHE

export async function updateCardForm() {
  updateCardFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(updateCardFormElement);    
    const cardId = editCardModalElement.dataset.id;  
    const currentListId = editCardModalElement.dataset.listId;
    const updatedCard = await updateCard({ title: data.get("title"), id: cardId, list_id: currentListId });
    
    const cardTitleElement = document.querySelector(`.card-id[data-id="${cardId}"] .card-title`); 
    cardTitleElement.textContent = data.get("title"); 
    
    const tagsContainer = document.querySelector("#edit-card-tags-container"); 
    await addAndRemoveTagsOfCard(updatedCard, tagsContainer);

    editCardModalElement.close();
    updateCardFormElement.reset();
  });
}

// SUPPRESSION D'UNE TACHE

export async function deleteCardForm() {
  deleteCardFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardId = deleteCardModalElement.dataset.id;
    const cardElement = document.querySelector(`.card-id[data-id="${cardId}"]`);
    await deleteCard({id: cardId});

    cardElement.remove();
    deleteCardModalElement.close();
  });
}