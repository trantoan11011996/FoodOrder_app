import logo from './logo.svg';
import './App.css';
import FoodApp from './components/foodapp';
import "./css/foodapp.css"
import { Container } from 'react-bootstrap';
function App() {
  return (
    <div>
      <Container className='container-app' fluid>
        <FoodApp/>
      </Container>
    </div>
  );
}

export default App;
