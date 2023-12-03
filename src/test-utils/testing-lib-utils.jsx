// import { render } from "@testing-library/react";
// import NoteState from "../context/notes/NoteState";

// // here "options" can be other render parameters
// const renderWithContext = (ui, options) =>
//   render(ui, { wrapper: NoteState, ...options });

// // re export everything
// // eslint-disable-next-line react-refresh/only-export-components


// //override render method
// export { renderWithContext as render };


import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { setupStore } from '../applicationStore/store'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";