export const getCards = async () => {
  try {
    const response = await fetch("http://localhost:3000/cards");
    const cards = await response.json();
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des cartes`);
    }    
    return cards;
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};
export const getCard = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/cards/${id}`);
    const card = await response.json();
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de la carte ${id}`);
    }    
    return card;
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};
export const createCard = async (cardData) => {
  try {
    const response = await fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la création de la carte`);
    }    
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};

export const updateCard = async (cardData) => {
  try {
    const response = await fetch(`http://localhost:3000/cards/${cardData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: cardData.title, 
        list_id: cardData.list_id,
      }),
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de la carte ${id}`);
    }    
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};

export const deleteCard = async (cardData) => {
  try {
    const deleteCardModalElement = document.querySelector("#delete-card-modal");
    const id = deleteCardModalElement.dataset.id;
    console.log(id);
    const response = await fetch(`http://localhost:3000/cards/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la suppresion de la carte`);
    }    
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};

export const updateCardPosition = async (cardData, newPosition) => {
  try {
    const id = cardData.dataset.id;
    const response = await fetch(`http://localhost:3000/cards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        position: newPosition,
      }),
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour de la carte ${id}`);
   }    
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};
