import { TagModel, CardModel } from '../models/associations.js';

export const getTagsOfCard = async (req, res) => {
    const cardId = parseInt(req.params.id, 10);
    const card = await CardModel.findOne({
        where: { id: cardId },
        include: { model: TagModel, as: 'tags', through: { attributes: [] }}
      });

    if (!cardId){
        res.status(404).json({"error": "Card not found. Please verify the provided ID."});
        return;
      }
    
    res.status(200).json(card.tags); 

}; 

export const associateTag = async (req, res) => {
    const cardId = parseInt(req.params.card_id, 10);
    const card = await CardModel.findByPk(cardId, { include: 'tags'});

    if(!card){
        res.status(404).json({"error": "Card not found.Please verify the provided ID."})
        return;
    }

    const tagId = parseInt(req.params.tag_id, 10);
    const tag = await TagModel.findByPk(tagId);
    
    if(!tag){
        res.status(404).json({"error": "Tag not found.Please verify the provided ID."})
        return;
    }

    if (await card.hasTag(tag)){
        res.status(400).json({"error": "Card already associated with this Tag."});
        return;
    }

    await card.addTag(tag);

    const updatedCard = await CardModel.findByPk(cardId, {
        include: {
            model: TagModel,   // Assurer que les tags sont récupérés après modification
            as: 'tags'
        }
    });

    res.send(updatedCard);
};

export const dissociateTag = async (req, res) => {
    const cardId = parseInt(req.params.card_id, 10);
    const card = await CardModel.findByPk(cardId, {include:'tags'});

    if(!card){
        res.status(404).json({"error": "Card not found.Please verify the provided ID."})
        return;
    }

    const tagId = parseInt(req.params.tag_id, 10);
    const tag = await TagModel.findByPk(tagId);

    if(!tag){
        res.status(404).json({"error": "Tag not found.Please verify the provided ID."})
        return;
    }

    if (!await card.hasTag(tag)){
        res.status(400).json({"error": "Card is not associated with this Tag."});
        return;
    }

    await card.removeTag(tag);
    res.send(card);
  }