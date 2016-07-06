'use strict';

/**
 * Инициализация приложения
 */

const cluster = require('cluster');
const _ = require('lodash');
const config = require('reddit-aggregator-config');
const workersCount = _.get(config, 'server.workers');
const serverSocket = _.get(config, 'server.socket');

const logger = require('reddit-aggregator-logger');



if (cluster.isMaster) {
	let log = logger('master');
	// Fork workers.
	for (var i = 0; i < workersCount; i++) {
		log.info(null, 'Start HTTP worker');
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		log.warn(`worker ${worker.process.pid} died`);
	});
} else {
	const log = logger('worker');
	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');


	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());



	// Подключаем мидлвары
	app.use(function(req, res, next) {
		// Формируем UID запроса
		req.requestId = (Math.random()*Date.now()*Math.pow(10, 5)).toString(16);
		log.info(req, `[req] ${req.method} ${req.url}`, req.body);
		next();
	});


	require('./routers')(app);

	app.listen(serverSocket, () => {
		log.info(null, `HTTP server start on ${serverSocket}.`);
	});

}

