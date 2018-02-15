
'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://userTest:userTest@ds255787.mlab.com:55787/warpedpuppy-node-restaurant-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/users';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';