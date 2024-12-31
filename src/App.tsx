import { FavoritesProvider } from './contexts/FavoritesContext';
import { Gallery } from './components/Gallery';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Photo Gallery</h1>
      <FavoritesProvider>
        <Gallery />
      </FavoritesProvider>
    </div>
  );
}

export default App;
