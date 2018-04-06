import appolo = require('../../../index');

import {logger} from './logger';
import {logger2} from './logger2' ;
import {logger3} from './logger3' ;
import {App} from "../../../index";

export = async function (env,app:App) {
    await app.module(logger)

    await app.module(logger2({test: 'test'}))

    await app.module(logger3({test: 'test3'}))

}