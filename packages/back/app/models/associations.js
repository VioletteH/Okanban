import ListModel from './List.js';
import TagModel from './Tag.js';
import CardModel from './Card.js';

ListModel.hasMany(CardModel, {
  as: 'cards',
  foreignKey: {
    name: 'list_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

CardModel.belongsTo(ListModel,{
    as: 'list',
    foreignKey: {
      name: 'list_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
});

CardModel.belongsToMany(TagModel, { 
  through: 'card_has_tag',
  foreignKey: 'card_id',
  as: 'tags'
});

TagModel.belongsToMany(CardModel, { 
  through: 'card_has_tag',
  foreignKey: 'tag_id', 
  as: 'cards'
});

export {ListModel, CardModel, TagModel};
