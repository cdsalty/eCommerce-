
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// In order to wire up a redux React app we need the following:
// 1. Provider component. THis comes from react-redux
import { Provider } from 'react-redux';
// 2. createStore. This comes from redux.
import { createStore, applyMiddleware} from 'redux';
// 3. reducers to give to createStore
import rootReducer from './reducers/rootReducer';
import reduxPromise from 'redux-promise'; // 9
// 4. Make a single rootReducer (3) to import our individual reducers
// 5. Make at least one indidivual reducer to import into root (4)
// 6. Create theStore (2) with the reducers (3 -> 4 -> 5)
// =========const theStore = createStore(rootReducer); no longer necessary because we need middleware
// 7. Put the Provider Component (1) with a prop of store with the store (6) around <App />
// 8. If we need redux middleware, we need to import it from redux (applyMiddleWare)
const middleware = applyMiddleware(reduxPromise);
// 9. import redux-promise so that if an action needs to return a promise/async
// the middleware will tell REdux to sha-lax... I'm coming.
// 10. When we make the store, kind of like connect, we apply middleware first
// then, we hand it the createStore
const theStore = middleware(createStore)
const theStoreWithMiddleware = theStore(rootReducer);



ReactDOM.render(
    <Provider store={theStoreWithMiddleware}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

