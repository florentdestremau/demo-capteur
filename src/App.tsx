import { AppProvider } from './AppContext';
import { AppShell } from './components/Layout/AppShell';
import './App.css';

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
