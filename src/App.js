import "./Styles.scss";
import Sidebar from "./Layout/Sidebar";
import Navbar from "./Layout/Navbar";
import Content from "./Layout/Content";

function App() {
  return (
    <div>
      {/* <Sidebar /> */}
      <div className="content-position">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}

export default App;
