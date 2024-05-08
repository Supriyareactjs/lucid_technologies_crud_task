// // store
// import {applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './redux/reducers';
// import rootSaga from './redux/sagas/Saga'; // Import saga
// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//     reducer: rootReducer,
// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootSaga); // Run your saga

// export default store;
// store.js
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './redux/reducers/userreducers';
import userSaga from './redux/sagas/userSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: userReducer, // Assuming rootReducer is the combined reducer
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);

export default store;
