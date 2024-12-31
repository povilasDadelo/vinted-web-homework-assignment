import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Image } from './Image';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { mockPhoto } from '../__mocks__/mockPhoto';

const renderWithProvider = (favorites?: number[]) => {
  if (favorites) {
    localStorage.setItem('my-favorite-photos', JSON.stringify(favorites));
  }

  return render(
    <FavoritesProvider>
      <Image {...mockPhoto} />
    </FavoritesProvider>
  );
};

describe('Image component render', () => {
  beforeEach(() => {
    renderWithProvider();
  });

  test('renders image with correct attributes', () => {
    const imgElement = screen.getByAltText('Test image');

    expect(imgElement).toHaveAttribute('src', 'small.jpg');
    expect(imgElement).toHaveAttribute('srcSet', 'medium.jpg 350w, large.jpg 940w, large2x.jpg 1800w');
  });

  test('renders alt text and photographer name correctly', () => {
    expect(screen.getByText('Test image')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

describe('Favorite functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('When the image is a favorite', () => {
    beforeEach(() => {
      renderWithProvider([mockPhoto.id]);
    });

    test('displays favorite indicator', () => {
      const favoriteIndicator = screen.getByText('❤️');

      expect(favoriteIndicator).toBeInTheDocument();
    });

    test('favorite button displays "Unfavorite"', () => {
      const favoriteButton = screen.getByRole('button');

      expect(favoriteButton).toBeInTheDocument();
      expect(favoriteButton).toHaveTextContent('Unfavorite');
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
      expect(favoriteButton).toHaveAttribute('aria-label', 'Remove from favorites');
    });

    test('clicking favorite button removes from favorites', () => {
      const favoriteButton = screen.getByRole('button');

      fireEvent.click(favoriteButton);

      expect(screen.queryByText('❤️')).not.toBeInTheDocument();
      expect(favoriteButton).toHaveTextContent('Favorite');
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
      expect(favoriteButton).toHaveAttribute('aria-label', 'Add to favorites');
      expect(JSON.parse(localStorage.getItem('my-favorite-photos')!)).not.toContain(mockPhoto.id);
    });
  });

  describe('When the image is not a favorite', () => {
    beforeEach(() => {
      renderWithProvider();
    });

    test('does not display favorite indicator', () => {
      const favoriteIndicator = screen.queryByText('❤️');

      expect(favoriteIndicator).not.toBeInTheDocument();
    });

    test('favorite button displays "Favorite"', () => {
      const favoriteButton = screen.getByRole('button');

      expect(favoriteButton).toBeInTheDocument();
      expect(favoriteButton).toHaveTextContent('Favorite');
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
      expect(favoriteButton).toHaveAttribute('aria-label', 'Add to favorites');
    });

    test('clicking favorite button adds to favorites', () => {
      const favoriteButton = screen.getByRole('button');

      fireEvent.click(favoriteButton);

      expect(screen.getByText('❤️')).toBeInTheDocument();
      expect(favoriteButton).toHaveTextContent('Unfavorite');
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
      expect(favoriteButton).toHaveAttribute('aria-label', 'Remove from favorites');
      expect(JSON.parse(localStorage.getItem('my-favorite-photos')!)).toContain(mockPhoto.id);
    });
  });
});
