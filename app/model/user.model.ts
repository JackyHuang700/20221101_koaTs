'use strict';
import {
  Model,
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

// const sequelize = new Sequelize('mysql://root:root@localhost:3306/blog_dev');

// module.exports = (sequelize: Sequelize) => {
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare nickname: CreationOptional<string>;
  declare pwd: CreationOptional<string>;
}

// export interface IUser {
//   id: number;
//   name: string;
//   nickname: string;
//   pwd: string;
// }

// interface IArticleCreationAttributes extends Optional<IUser, 'id'> {}
