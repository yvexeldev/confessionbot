import { Sequelize } from 'sequelize-typescript';
import { envConfig } from './env';
import { User } from '../models/User';
import { Message } from '../models/Message';

const sequelize = new Sequelize({
    database: envConfig.db_name,
    dialect: 'postgres',
    username: envConfig.db_user,
    password: envConfig.db_password,
    host: envConfig.db_host,
    port: Number(envConfig.db_port),
    models: [Message, User],
    logging: false
});

export default sequelize;
