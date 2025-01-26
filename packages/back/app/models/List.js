import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

class List extends Model{}

List.init(
  {    
    title: {
      type: DataTypes.STRING,
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
    modelName: 'List', 
    tableName: 'list',    
  },
);

export default List;
