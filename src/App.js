import "./Styles.scss";
import Navbar from "./Layout/Navbar";
import Content from "./Layout/Content";

function App() {
  return (
    <div>
      <div className="content-position">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}

export default App;
