import './App.css';
import Home from './components/Home';
import { GameStateProvider } from './context/GameStateContext';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <GameStateProvider>
      <SocketProvider>
        <Home></Home>
      </SocketProvider>
    </GameStateProvider>
  );
}

export default App;
