"use strict";

const activeEnv = process.env.NODE_ENV || "local";
const envFile = `./../env/environment.${activeEnv}`;
const env = require(envFile);
const commonConfig = require('./config.common')(env);

const config = {
    env: activeEnv,
    port: env.port || 8001,
    allowedRequestOrigins: [],
    logger: {
        name: "user",
        output: env.LOGGER_OUTPUT || "short"
    }
};

module.exports = Object.assign({}, commonConfig, config);
