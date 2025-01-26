import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

class Card extends Model{}

Card.init(
  { 
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },   
    position: {
      type: DataTypes.INTEGER,  
      allowNull: false,
      defaultValue: 1,  
    },
  },
  {
    sequelize, 
    modelName: 'Card', 
    tableName: 'card',    
  },
);

export default Card;
