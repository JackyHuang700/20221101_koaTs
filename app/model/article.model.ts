'use strict';
// type IArticle = {
//   id: number;
//   uid: number;
//   title: string;
//   content: string;
// };
import {
  Model,
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
// import { Table, Column, Model, HasMany } from 'sequelize-typescript';
// import UserModel from './user.model';
// import {sequelize} from './index';
// module.exports = (sequelize: Sequelize) => {
export default class Article extends Model<
  InferAttributes<Article>,
  InferCreationAttributes<Article>
> {
  declare id: CreationOptional<number>;
  declare uid: number;
  declare title: string;
  declare content: string;
}

// 辜濂
// Article.belongsTo(User, {
//   foreignKey: 'uid',
//   targetKey: 'id',
//   as: 'userInfo',
//   constraints: false,
// });

// return Article;
// };

// interface IArticleCreationAttributes extends Optional<IArticle, 'id'> {}
