import Joi from 'joi';
import { ListModel } from '../models/associations.js';

export const getLists = async (req, res) => {
  const lists = await ListModel.findAll({order: [['position', 'ASC']]});
  res.status(200).json(lists);
}

export const getList = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const list = await ListModel.findByPk(id);

  if (!list){
    res.status(404).json({"error": "List not found. Please verify the provided ID."});
    return;
  }

  res.json(list);
};

export const createList = async (req, res) => {
  const data = req.body;
  
  const schema = Joi.object({
    title:Joi.string().required().min(1), 
    position:Joi.number().integer().min(1),
  });     

  const { error } = schema.validate(data);
  if (error){
    res.status(400).json({ "error": error.message });
    return;
  }

  const list = await ListModel.create(data);
  res.status(201).json(list);
};

export const updateList = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const list = await ListModel.findByPk(id);
  const data = req.body;      

  if (!list){
    res.status(404).json({"error": "List not found. Please verify the provided ID."});
    return;
  }

  const schema = Joi.object({
    title:Joi.string().min(1), 
    position:Joi.number().integer().min(1), 
  });

  const { error } = schema.validate(data);
  if (error){
    res.status(400).json({ "error": error.message });
    return;
  }

  if (data.position != undefined){
    list.position = data.position;
  }

  if (data.title != undefined){
    list.title = data.title;
  }

  await list.save();
  res.json(list);
};


export const deleteList = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const list = await ListModel.findByPk(id);

  if (!list){
    res.status(404).json({"error": "List not found. Please verify the provided ID."});
    return;
  }

  await list.destroy();
  res.status(204).end();
};