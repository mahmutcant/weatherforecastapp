import './App.css'
import Navbar from './components/Navbar'
import mainPageIcon from "./assets/mainpage-icon.svg";
function App() {

  return (
    <>
      <Navbar/>
      <div>
        <img src={mainPageIcon} alt="" />
      </div>
    </>
  )
}

export default App
