import Joi from 'joi';
import { CardModel, ListModel } from '../models/associations.js';

const listExistRule = async (value, helper) => {
  if (value !== undefined){
    const list = await ListModel.findByPk(value);
    if (!list){
      return helper.message('"list" does not exist');
    }
  } 
};

export const getCards = async (req, res) => {
  const cards = await CardModel.findAll();
  res.status(200).json(cards);
};

export const getCard = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const card = await CardModel.findByPk(id, {include: "tags"});

  if (!card){
    res.status(404).json({"error": "Card not found. Please verify the provided ID."});
    return;
  }

  res.json(card);
};

export const createCard = async (req, res) => {
  const data = req.body;

  const schema = Joi.object({
    title:Joi.string().min(1),
    position:Joi.number().integer().min(1),
    list_id: Joi.number().integer().required().external(listExistRule)  
  });     

  const cardData = await schema.validateAsync(data);
  const card = await CardModel.create(cardData);
  res.status(201).json(card);
 
};


export const updateCard = async (req, res) => {

  const id = parseInt(req.params.id, 10);
  const card = await CardModel.findByPk(id);
  const data = req.body;   

  if (!card){
    res.status(404).json({"error": "Card not found. Please verify the provided ID."});
    return;
  }

  const schema = Joi.object({
    title:Joi.string().min(1),
    position:Joi.number().integer().min(1),
    list_id:Joi.number().integer().required().external(listExistRule)
  }).min(1); 

    const cardData = await schema.validateAsync(data);
    card.set(cardData);
    await card.save();    
    res.status(201).json(card);

};

export const deleteCard = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const card = await CardModel.findByPk(id);

  if (!card){
    res.status(404).json({"error": "Card not found. Please verify the provided ID."});
    return;
  }

  await card.destroy();
  res.status(204).end();
};

export const getCardsOfList = async (req, res) => {
    const listId = parseInt(req.params.id, 10);
    const cards = await CardModel.findAll({where: {list_id: listId}})
  
    if (!listId){
      res.status(404).json({"error": "Card not found. Please verify the provided ID."});
      return;
    }
    res.status(200).json(cards);
};

