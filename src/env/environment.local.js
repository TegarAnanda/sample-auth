const baseEnv = require("./environment");
const env = {};

env.JWT_SECRET = "secret";
env.JWT_EXPIRES_IN = "1h";
env.REFRESH_TOKEN_SECRET = "refresh-secret";
env.REFRESH_TOKEN_EXPIRES_IN = "2h";

module.exports = {...baseEnv, ...env};