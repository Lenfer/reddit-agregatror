'use strict';

/**
 * Дефолтный конфиг
 */

const _ = require('lodash');
const numCPUs = require('os').cpus().length;


module.exports = {
	logger: {
		dateFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
	},

	server: {
		workers: numCPUs,
		socket: './reddit-agregate.socket'
	}
};