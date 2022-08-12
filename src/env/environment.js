const env = {};
env.ENV = "local";

env.REDIS_HOST = 'localhost';
env.REDIS_PORT = 6379;
env.REDIS_CACHE_KEY = 'user';
env.REDIS_DB = 0;

env.DB_MONGODB_HOST = "localhost";
env.DB_MONGODB_DATABASE = "user";
env.DB_MONGODB_USER = "";
env.DB_MONGODB_PASSWORD = "";
env.DB_MONGODB_SSL = true;

module.exports = env;