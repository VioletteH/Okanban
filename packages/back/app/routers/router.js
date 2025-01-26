import { Router } from 'express';
import { getLists, getList, createList, updateList, deleteList } from '../controllers/listController.js';
import { getCards, getCard, createCard, updateCard, deleteCard, getCardsOfList } from '../controllers/cardController.js';
import { getTags, createTag, updateTag, deleteTag } from '../controllers/tagController.js';
import { getTagsOfCard, associateTag, dissociateTag } from '../controllers/cardHasTagController.js';

import controllerWrapper from './controllerWrapper.js';

const router = Router();

router.get('/lists', controllerWrapper(getLists));
router.get('/lists/:id', controllerWrapper(getList));
router.post('/lists', controllerWrapper(createList));
router.patch('/lists/:id', controllerWrapper(updateList));
router.delete('/lists/:id', controllerWrapper(deleteList));

router.get('/cards', controllerWrapper(getCards));
router.get('/cards/:id', controllerWrapper(getCard));
router.post('/cards', controllerWrapper(createCard)); 

router.patch('/cards/:id', controllerWrapper(updateCard));
router.delete('/cards/:id', controllerWrapper(deleteCard));
router.get('/lists/:id/cards', controllerWrapper(getCardsOfList));

router.get('/tags', controllerWrapper(getTags));
router.post('/tags', controllerWrapper(createTag));
router.patch('/tags/:id', controllerWrapper(updateTag));
router.delete('/tags/:id', controllerWrapper(deleteTag));

router.get('/cards/:id/tags', controllerWrapper(getTagsOfCard))
router.post('/cards/:card_id/tags/:tag_id', controllerWrapper(associateTag))
router.delete('/cards/:card_id/tags/:tag_id', controllerWrapper(dissociateTag))

export default router;