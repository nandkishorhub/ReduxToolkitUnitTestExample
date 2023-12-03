import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notesReducer from "../reducers/noteReducer/notesReducer";
import alertReducer from "../reducers/noteReducer/alertReducer";


const rootReducer = combineReducers({
  notes: notesReducer,
  alert: alertReducer,
})
// export const store = configureStore({
//   reducer: {
//     notes: notesReducer,
//     alert: alertReducer,
//   },
//   // to avoid serialization errors/warning here we have disable defualt middleware from redux toolkit
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}