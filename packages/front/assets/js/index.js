import { openAddListModal, closeAddListModal, displayLists, createListForm, updateListForm, deleteListForm } from "./list.js";
import { createCardForm,  updateCardForm, deleteCardForm } from "./card.js";

document.addEventListener("DOMContentLoaded", () => {
    openAddListModal();
    closeAddListModal();
    createListForm();
    updateListForm();
    deleteListForm();

    displayLists().then(() => {
      createCardForm();
      updateCardForm();
      deleteCardForm();
    })
    
    
  });