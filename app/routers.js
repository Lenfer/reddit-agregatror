'use strict';

/**
 * Подключаем модули с бизнес логикой
 */

module.exports = (app) => {
	require('reddit-aggregator-main-page')(app);
};

