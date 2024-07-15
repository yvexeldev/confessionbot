function loadEnv(value: string) {
    if (process.env[value]) {
        return process.env[value];
    }
    throw new Error(`${value} is not defined in .env!`);
}

export const envConfig = {
    bot_token: loadEnv('BOT_TOKEN'),
    db_name: loadEnv('DB_NAME'),
    db_user: loadEnv('DB_USER'),
    db_password: loadEnv('DB_PASSWORD'),
    db_host: loadEnv('DB_HOST'),
    db_port: loadEnv('DB_PORT'),
    channel_id: loadEnv('CHANNEL_ID'),
    group_id: loadEnv('GROUP_ID'),
};
