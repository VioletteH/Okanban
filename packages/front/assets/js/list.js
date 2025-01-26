import { getLists, createList, updateList, deleteList, updateListPosition } from "./api/lists.api.js";
import { displayCardsInList } from "./card.js";
import { displayTags } from "./tag.js";

// QUERY SELECTOR

const openAddListModalElement = document.querySelector("#add-list-button");

const addListModalElement = document.querySelector("#add-list-modal");
const editListModalElement = document.querySelector("#edit-list-modal");
const editListTitleElement = document.querySelector("#edit-list-title");
const deleteListModalElement = document.querySelector("#delete-list-modal");
const addCardModalElement = document.querySelector("#add-card-modal");

const closeAddListModalElements = document.querySelectorAll(".close-add-list");
const closeEditListModalElements = document.querySelectorAll(".close-edit-list");
const closeDeleteListModalElements = document.querySelectorAll(".close-delete-list");
const closeAddCardModalElements = document.querySelectorAll(".close-add-card");

const addListFormElement = document.querySelector("#add-list-form");
const updateListFormElement = document.querySelector("#edit-list-form");
const deleteListFormElement = document.querySelector("#delete-list-form");

const containerElement = document.querySelector("#lists-container");
const listTemplateElement = document.querySelector("#list-template");

// OUVERTURE - FERMETURE MODALE "ADD LIST"

export function openAddListModal() {
  openAddListModalElement.addEventListener("click", async (event) => {
    event.preventDefault();
    addListModalElement.showModal();
  });
}

export function closeAddListModal() {
  for (let closeAddListModalElement of closeAddListModalElements) {
    closeAddListModalElement.addEventListener("click", async (event) => {
      event.preventDefault();
      addListModalElement.close();
    });
  }
}

// INSERTION DANS LE DOM

export async function insertListInDom(list) {

    // Clone du template liste

    const cloneTemplate = listTemplateElement.content.cloneNode(true);

    const listTitleElement = cloneTemplate.querySelector(".list-title");
    listTitleElement.textContent = list.title;

    const listIdElement = cloneTemplate.querySelector("[slot='list-id']");
    listIdElement.dataset.id = list.id;
    listIdElement.dataset.position = list.position;

    // Ouverture - fermeture modale "edit list"

    const openEditListModalElement = cloneTemplate.querySelector("[slot='edit-list-button']");

    openEditListModalElement.addEventListener("click", async (event) => {
      event.preventDefault();
      editListModalElement.showModal();
      editListModalElement.dataset.id = list.id;
      editListTitleElement.placeholder = list.title;
    });

    for (let closeEditListModalElement of closeEditListModalElements) {
      closeEditListModalElement.addEventListener("click", async (event) => {
        event.preventDefault();
        editListModalElement.close();
      });
    }

    // Ouverture - fermeture modale "delete list"

    const openDeleteListModalElement = cloneTemplate.querySelector("[slot='delete-list-button']");

    openDeleteListModalElement.addEventListener("click", async (event) => {
      event.preventDefault();
      deleteListModalElement.showModal();
      deleteListModalElement.dataset.id = list.id;
    });

    for (let closeDeleteListModalElement of closeDeleteListModalElements) {
      closeDeleteListModalElement.addEventListener("click", async (event) => {
        event.preventDefault();
        deleteListModalElement.close();
      });
    }

    // Ouverture - fermeture modale "add card"

    const addCardButtonElement = cloneTemplate.querySelector("#add-card-button");

    addCardButtonElement.addEventListener("click", async (event) => {
      event.preventDefault();
      addCardModalElement.showModal();
      addCardModalElement.dataset.listId = list.id;

      const tagsContainer = document.querySelector("#add-card-tags-container"); 
      let cardTagsIds = []
      displayTags(tagsContainer, cardTagsIds);
    });

    for (let closeAddCardModalElement of closeAddCardModalElements) {
      closeAddCardModalElement.addEventListener("click", async (event) => {
        event.preventDefault();
        addCardModalElement.close();
      });
    }

    // Ajout du clone template liste
    containerElement.appendChild(cloneTemplate);

}
// AFFICHAGE DES LISTES

export async function displayLists() {

  const listsAPI = await getLists();
  containerElement.innerHTML = "";

  for (let list of listsAPI) {
    await insertListInDom(list);
    displayCardsInList(list.id);

    Sortable.create(containerElement, {
      onEnd(event) {
        const movedListElement = event.item;
        const newPosition =
          Array.from(containerElement.children).indexOf(movedListElement) + 1;
        updateListPosition(movedListElement, newPosition);
      },
    });
  }
}

// CREATION D'UNE LISTE

export function createListForm() {
  addListFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(addListFormElement);
    await createList({ title: data.get("title") });
    addListModalElement.close();
    addListFormElement.reset();
    displayLists();
  });
}

// MODIFICATION D'UNE LISTE

export async function updateListForm() {
  updateListFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(updateListFormElement);
    const listId = editListModalElement.dataset.id; 
    await updateList({ title: data.get("title"), id: listId });
    const listTitleElement = document.querySelector(`.list-id[data-id="${listId}"] .list-title`); 
    listTitleElement.textContent = data.get("title"); 
    editListModalElement.close();
    updateListFormElement.reset();
  });
}

// SUPPRESSION D'UNE LISTE

export async function deleteListForm() {
  deleteListFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const listId = deleteListModalElement.dataset.id; 
    await deleteList(listId);
    const listElement = document.querySelector(`.list-id[data-id="${listId}"]`); 
    listElement.remove(); 
    deleteListModalElement.close();
  });
}
