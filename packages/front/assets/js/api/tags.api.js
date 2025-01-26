export const getTags = async () => {
  try {
    const response = await fetch("http://localhost:3000/tags");
    const tagsAPI = await response.json();
    if (!response.ok) {
      throw new Error( `Erreur lors de la récupération des tags` );
    }
    return tagsAPI;
  } catch (error) {
    console.error(error);
    throw new Error("Base de données indisponible");
  }
};

export const getTagsOfCard = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/cards/${id}/tags`);
    if (!response.ok) {
      throw new Error( `Erreur lors de la récupération des tags pour la carte ${id}` );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; 
  }
};

export async function associateTagToCard(cardId, tagId) {
  try{
    const response = await fetch(
      `http://localhost:3000/cards/${cardId}/tags/${tagId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag_id: tagId }),
      }
    );
    if (!response.ok) {
      throw new Error("Erreur lors de l'association du tag à la tâche");
    }
    return await response.json();
  }catch(error){
    console.error(error);
    throw new Error("Base de données indisponible");
  }
  
};

export async function dissociateTagToCard(cardId, tagId) {
  try{
    const response = await fetch(
      `http://localhost:3000/cards/${cardId}/tags/${tagId}`, {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Erreur lors de la suppresion`);
    }
    return response
  }catch(error){
    console.error(error);
    throw new Error("Base de données indisponible");
  }
  
};