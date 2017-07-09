import appolo = require('../../../../index');

import logger from './logger';
import    logger2 from './logger2';
import    logger3 from './logger3';
import    logger4 from './logger4';
import    logger5 from './logger5';

module.exports = function(env){
    appolo.use(logger);
    appolo.use(logger2({test:'test2'}));
    appolo.use(logger3({test:'test3'}),true);
    appolo.use(logger4({test:'test4'}),true);
    appolo.use(logger5({test:'test5'}));
}