'use strict';

/**
 * Настройки для разработки
 */

const _ = require('lodash');

module.exports = _.merge(require('./default'), {
	server: {
		workers: 1,
		socket: 8080
	}
});
