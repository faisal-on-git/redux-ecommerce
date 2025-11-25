import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from '../redux/reducers/cartReducer';

/**
 * Test utilities for Redux integration testing
 * Uses real reducers (no mocking) for authentic integration tests
 */

// Combined reducer for testing - uses real cartReducer
// ProductReducer is minimal to avoid axios ESM import issues in Jest
const combinedReducer = combineReducers({
  cartReducer,
  productReducer: (state = { products: [], loading: false, error: null }, action) => state
});

/**
 * Renders a component wrapped with Redux Provider and React Router
 * 
 * @param {React.ReactElement} component - The component to render
 * @param {Object} state - Initial Redux state (shorthand for initialState)
 * @param {Object} options - Additional options
 * @param {Object} options.initialState - Initial Redux state
 * @param {Object} options.store - Custom Redux store (overrides initialState)
 * @param {Object} options.history - Custom history object for Router
 * @param {Object} options.route - Initial route path
 * @returns {Object} RTL render result plus store, history, and rerenderWithRedux
 * 
 * @example
 * // Basic usage
 * const { store } = renderWithRedux(<MyComponent />);
 * 
 * @example
 * // With initial state
 * const { store } = renderWithRedux(<MyComponent />, {
 *   cartReducer: { products: [], totalCount: 0 }
 * });
 * 
 * @example
 * // With custom history for navigation testing
 * const { history } = renderWithRedux(<MyComponent />, {}, { route: '/products' });
 */
export default function renderWithRedux(
  component,
  state = {},
  {
    initialState = state,
    store = createStore(combinedReducer, initialState, applyMiddleware(thunk)),
    history = createMemoryHistory(),
    route = '/',
  } = {}
) {
  // Set initial route if provided
  if (route !== '/') {
    history.push(route);
  }

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>
  );

  const utils = render(component, { wrapper: Wrapper });

  /**
   * Rerender with a new component and optionally new state/store
   * Useful for testing component updates with different props or state
   */
  function rerenderWithRedux(
    newComponent,
    newState = {},
    newStore = createStore(combinedReducer, newState, applyMiddleware(thunk))
  ) {
    const NewWrapper = ({ children }) => (
      <Provider store={newStore}>
        <Router history={history}>
          {children}
        </Router>
      </Provider>
    );

    return {
      ...utils.rerender(<NewWrapper>{newComponent}</NewWrapper>),
      store: newStore,
    };
  }

  return {
    ...utils,
    rerenderWithRedux,
    store,
    history,
  };
}

/**
 * Creates a test store with optional initial state
 * Useful when you need direct store access without rendering
 * 
 * @param {Object} initialState - Initial Redux state
 * @returns {Object} Redux store
 */
export function createTestStore(initialState = {}) {
  return createStore(combinedReducer, initialState, applyMiddleware(thunk));
}

/**
 * Default empty cart state for convenience
 */
export const emptyCartState = {
  cartReducer: {
    products: [],
    totalCount: 0,
  },
  productReducer: {
    products: [],
    loading: false,
    error: null,
  },
};

/**
 * Helper to create cart state with products
 * 
 * @param {Array} products - Array of products in cart
 * @returns {Object} Redux state with cart containing products
 */
export function createCartState(products = []) {
  const totalCount = products.reduce((sum, p) => sum + (p.quantity || 1), 0);
  return {
    cartReducer: {
      products,
      totalCount,
    },
    productReducer: {
      products: [],
      loading: false,
      error: null,
    },
  };
}

