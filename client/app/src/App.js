import logo from './logo.svg';
// import './App.css';
import Form from './components/form/form';
import Table from './components/registrationsTable/table';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App w-[95%] h-100 bg-grey-500">
      <Router>
        <Routes>
          <Route exact path="/" element={<Form/>} />
          <Route path="/users" element={<Table />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
