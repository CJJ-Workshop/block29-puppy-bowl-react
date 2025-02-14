import { useState } from 'react';
import './App.css';
import Modal from './components/Modal.jsx';
import ViewAllPlayers from './components/ViewAllPlayers';
import AddPlayerForm from './components/AddPlayerForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔹 Fix: Define state

  return (
    <div className="app-container">
      <h1>Puppy Bowl!</h1>
      <button onClick={() => setIsModalOpen(true)} className="details-btn">
        Add New Player
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddPlayerForm onPlayerAdded={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <ViewAllPlayers />
    </div>
  );
}

export default App;
