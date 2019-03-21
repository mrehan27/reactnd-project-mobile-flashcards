import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistence from './persistence';
import logger from './logger';

export default applyMiddleware(
    thunk,
    persistence,
    logger,
);
