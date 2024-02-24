import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from './Components/Join';
import Chat from './Components/Chat';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" exact  element={<Join />}/>
        <Route path="/chat"   element={<Chat />}/>
      </Routes>
    </Router>
  )
}

export default App
