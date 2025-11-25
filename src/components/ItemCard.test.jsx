import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import renderWithRedux, { createTestStore, createCartState } from '../utils/testUtils';
import ItemCard from './ItemCard';

/**
 * Integration tests for ItemCard component
 * Uses real Redux store with actual cartReducer (no mocking) 
 * to verify actual integration behavior
 */

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product Title',
  price: 29.99,
  image: 'https://example.com/image.jpg',
  category: 'electronics',
  rating: {
    rate: 4.5,
    count: 120
  }
};

const mockProductWithoutRating = {
  id: 2,
  title: 'Product Without Rating',
  price: 19.99,
  image: 'https://example.com/image2.jpg',
  category: 'clothing'
};

describe('ItemCard Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render product information correctly', () => {
      renderWithRedux(<ItemCard product={mockProduct} />);

      expect(screen.getByText('Test Product Title')).toBeInTheDocument();
      expect(screen.getByText('electronics')).toBeInTheDocument();
      expect(screen.getByText(/₹/)).toBeInTheDocument();
      expect(screen.getByAltText('Test Product Title')).toBeInTheDocument();
    });

    it('should format price correctly with INR formatting', () => {
      renderWithRedux(<ItemCard product={mockProduct} />);
      
      // Price should be multiplied by 50 and formatted
      // 29.99 * 50 = 1,499.50
      expect(screen.getByText('₹ 1,499.50')).toBeInTheDocument();
    });

    it('should display count when available', () => {
      renderWithRedux(<ItemCard product={mockProduct} />);
      
      expect(screen.getByText('(120)')).toBeInTheDocument();
    });

    it('should handle missing rating gracefully', () => {
      renderWithRedux(<ItemCard product={mockProductWithoutRating} />);
      
      expect(screen.getByText('(0)')).toBeInTheDocument();
    });

    it('should render Add to Cart button', () => {
      renderWithRedux(<ItemCard product={mockProduct} />);
      
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });
  });

  describe('Add to Cart Integration', () => {
    it('should add product to cart when clicking Add to Cart button', () => {
      const { store } = renderWithRedux(<ItemCard product={mockProduct} />);

      // Verify cart is initially empty
      expect(store.getState().cartReducer.products).toHaveLength(0);
      expect(store.getState().cartReducer.totalCount).toBe(0);

      // Click Add to Cart
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(addButton);

      // Verify product was added to cart in the real store
      const cartState = store.getState().cartReducer;
      expect(cartState.products).toHaveLength(1);
      expect(cartState.products[0].id).toBe(mockProduct.id);
      expect(cartState.products[0].title).toBe(mockProduct.title);
      expect(cartState.products[0].quantity).toBe(1);
      expect(cartState.totalCount).toBe(1);
    });

    it('should increment quantity when adding same product multiple times', () => {
      const { store } = renderWithRedux(<ItemCard product={mockProduct} />);

      const addButton = screen.getByRole('button', { name: /add to cart/i });
      
      // Add product 3 times
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      // Verify quantity is incremented, not adding duplicates
      const cartState = store.getState().cartReducer;
      expect(cartState.products).toHaveLength(1);
      expect(cartState.products[0].quantity).toBe(3);
      expect(cartState.totalCount).toBe(3);
    });

    it('should add different products separately', () => {
      const { store, rerenderWithRedux } = renderWithRedux(<ItemCard product={mockProduct} />);

      // Add first product
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

      // Rerender with second product (same store)
      rerenderWithRedux(
        <ItemCard product={mockProductWithoutRating} />,
        {},
        store // Use the same store to preserve cart state
      );

      // Add second product
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

      // Verify both products are in cart
      const cartState = store.getState().cartReducer;
      expect(cartState.products).toHaveLength(2);
      expect(cartState.totalCount).toBe(2);
    });

    it('should work with pre-existing cart items', () => {
      const preloadedState = createCartState([
        { id: 99, title: 'Existing Product', price: 10, quantity: 2 }
      ]);

      const { store } = renderWithRedux(
        <ItemCard product={mockProduct} />,
        preloadedState
      );

      // Add new product
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

      // Verify new product is added alongside existing items
      const cartState = store.getState().cartReducer;
      expect(cartState.products).toHaveLength(2);
      expect(cartState.totalCount).toBe(3);
    });
  });

  describe('Navigation Integration', () => {
    it('should navigate to product details page when clicking card', () => {
      const { history } = renderWithRedux(<ItemCard product={mockProduct} />);

      // Click on the product image (use alt text to be specific)
      const productImage = screen.getByAltText('Test Product Title');
      fireEvent.click(productImage);

      // Verify navigation occurred
      expect(history.location.pathname).toBe('/details/1');
    });

    it('should navigate to correct product ID', () => {
      const productWithDifferentId = { ...mockProduct, id: 42 };
      const { history } = renderWithRedux(<ItemCard product={productWithDifferentId} />);

      // Click on product image using alt text
      const productImage = screen.getByAltText('Test Product Title');
      fireEvent.click(productImage);

      expect(history.location.pathname).toBe('/details/42');
    });

    it('should not navigate when clicking Add to Cart button', () => {
      const { history } = renderWithRedux(<ItemCard product={mockProduct} />);
      const initialPath = history.location.pathname;

      // Click Add to Cart (should stop propagation)
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

      // Path should remain unchanged
      expect(history.location.pathname).toBe(initialPath);
    });
  });

  describe('Multiple Cards Integration', () => {
    it('should work correctly with multiple ItemCard instances sharing the same store', () => {
      const store = createTestStore();
      const { history } = renderWithRedux(<></>, {}, { store });

      const products = [
        { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg', category: 'cat1' },
        { id: 2, title: 'Product 2', price: 20, image: 'img2.jpg', category: 'cat2' },
        { id: 3, title: 'Product 3', price: 30, image: 'img3.jpg', category: 'cat3' },
      ];

      render(
        <Provider store={store}>
          <Router history={history}>
            {products.map(product => (
              <ItemCard key={product.id} product={product} />
            ))}
          </Router>
        </Provider>
      );

      // Get all Add to Cart buttons
      const addButtons = screen.getAllByRole('button', { name: /add to cart/i });
      expect(addButtons).toHaveLength(3);

      // Add first product
      fireEvent.click(addButtons[0]);
      expect(store.getState().cartReducer.products).toHaveLength(1);
      expect(store.getState().cartReducer.products[0].title).toBe('Product 1');

      // Add third product
      fireEvent.click(addButtons[2]);
      expect(store.getState().cartReducer.products).toHaveLength(2);

      // Add first product again
      fireEvent.click(addButtons[0]);
      expect(store.getState().cartReducer.products).toHaveLength(2);
      expect(store.getState().cartReducer.products[0].quantity).toBe(2);
      expect(store.getState().cartReducer.totalCount).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle product with very long title', () => {
      const longTitleProduct = {
        ...mockProduct,
        title: 'This is a very long product title that should be truncated properly by the CSS styles applied to the component'
      };

      renderWithRedux(<ItemCard product={longTitleProduct} />);
      
      expect(screen.getByText(longTitleProduct.title)).toBeInTheDocument();
    });

    it('should handle product with zero price', () => {
      const freeProduct = { ...mockProduct, price: 0 };

      renderWithRedux(<ItemCard product={freeProduct} />);
      
      expect(screen.getByText('₹ 0.00')).toBeInTheDocument();
    });

    it('should handle product with decimal rating', () => {
      const decimalRatingProduct = {
        ...mockProduct,
        rating: { rate: 3.7, count: 50 }
      };

      renderWithRedux(<ItemCard product={decimalRatingProduct} />);
      
      expect(screen.getByText('(50)')).toBeInTheDocument();
    });
  });
});
