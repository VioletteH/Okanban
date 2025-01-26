import Joi from 'joi';
import { TagModel } from '../models/associations.js';

export const getTags = async (req, res) => {
  const tags = await TagModel.findAll();
  res.status(200).json(tags);
}

export const createTag = async (req, res) => {
  const data = req.body;

  const schema = Joi.object({
    name:Joi.string().required().min(1), 
    color:Joi.string().allow(''), 
  });     

  const { error, value: tagData } = schema.validate(data);
  if (error){
    res.status(400).json({ "error": error.message });
    return;
  }

  const tag = await TagModel.create(tagData);
  res.status(201).json(tag);
};

export const updateTag = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tag = await TagModel.findByPk(id);
  const data = req.body;   

  if (!tag){
    res.status(404).json({"error": "Tag not found. Please verify the provided ID."});
    return;
  }

  const schema = Joi.object({
    name:Joi.string().required().min(1), 
    color:Joi.string().allow(''), 
  });   

  const { error, value: tagData } = schema.validate(data);
  if (error){
    res.status(400).json({ "error": error.message });
    return;
  }

  tag.set(tagData);
  await tag.save();
  res.json(tag);
};

export const deleteTag = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tag = await TagModel.findByPk(id);

  if (!tag){
    res.status(404).json({"error": "Tag not found. Please verify the provided ID."});
    return;
  }

  await tag.destroy();
  res.status(204).end();
};

