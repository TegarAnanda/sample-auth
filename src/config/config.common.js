module.exports = (env) => (
    {
        auth: {
            jwt_secret: env.JWT_SECRET,
            jwt_expiresin: env.JWT_EXPIRES_IN || "1h",
            refresh_token_secret: env.REFRESH_TOKEN_SECRET,
		    refresh_token_expiresin: env.REFRESH_TOKEN_EXPIRES_IN || "2h"
        },
        databases: {
            mongodb: {
                host: env.DB_MONGODB_HOST,
                database: env.DB_MONGODB_DATABASE,
                user: env.DB_MONGODB_USER,
                password: env.DB_MONGODB_PASSWORD,
                ssl: env.DB_MONGODB_SSL || false
            }
        },
    }
);