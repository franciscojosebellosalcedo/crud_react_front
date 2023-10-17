import './App.css';
import ProviderContextApp from './context/ProviderContextApp';
import RoutersPages from './routersPages/RoutersPages';

function App() {
  return (
    <div className="app">
      <ProviderContextApp>
        <RoutersPages/>
      </ProviderContextApp>
    </div>
  );
}

export default App;
