import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingComponent from './components/LandingComponent';
import ChatbotComponent from './components/ChatbotComponent';
import ExitComponent from './components/ExitComponent';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingComponent />} />
          <Route path="/chatbot" element={<ChatbotComponent />} />
          <Route path="/success" element={<ExitComponent />} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
