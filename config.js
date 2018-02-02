//don't forget mLab db values
'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/restaurants';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/users';
exports.PORT = process.env.PORT || 8080;