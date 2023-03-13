import SideBar from "./components/sideBar/sideBar";
import { BrowserRouter } from "react-router-dom";
import styles from "./app.modules.css";
import Home from "./components/sideBar/home";

function App() {
  return (
    <div>
      <div className={styles.flex_container}>
        <div>
          <SideBar></SideBar>
        </div>
      </div>
    </div>
  );
}

export default App;
