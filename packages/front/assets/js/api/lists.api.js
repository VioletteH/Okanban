export const getLists = async () => {
    try{
        const response = await fetch("http://localhost:3000/lists");
        const listsAPI = await response.json();    
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des listes`);
        }  
        return listsAPI; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getList = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/lists/${id}`);
        const list = await response.json();
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de la liste ${id}`);
        }      
        return list; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};
export const createList = async (listData) => {
    try{
        const response = await fetch("http://localhost:3000/lists", {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(listData), 
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la création de la liste`);
        }    
        return await response.json()
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const updateList = async (listData) => {
    try{
        const editListModalElement = document.querySelector("#edit-list-modal");
        const id = editListModalElement.dataset.id; 
        const title = document.querySelector('#edit-list-title').value;
        const response = await fetch(`http://localhost:3000/lists/${id}`, {
            method: "PATCH", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({
                title : title
            }), 
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour de la liste ${id}`);
        }    
        return await response.json()
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const deleteList = async (listData) => {
    try{
        const deleteListModalElement = document.querySelector("#delete-list-modal");
        const id = deleteListModalElement.dataset.id; 
        const response = await fetch(`http://localhost:3000/lists/${id}`, {
            method: "DELETE", 
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression de la liste ${id}`);
        }    
        return response
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const updateListPosition = async (listData, newPosition) => {
    try{
        const id = listData.dataset.id;
        const response = await fetch(`http://localhost:3000/lists/${id}`, {
            method: "PATCH", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({
                position : newPosition
            }), 
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour de la position de la liste ${id}`);
        }    
        return await response.json()
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};