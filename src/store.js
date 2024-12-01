import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api';
import rootReducer from './reducer';

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: 'development',
});
setupListeners(store.dispatch);


export default store
