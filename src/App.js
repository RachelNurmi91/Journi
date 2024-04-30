import "./Styles.scss";
import Navbar from "./Layout/Navbar";
import Content from "./Layout/Content";
import TokenVerification from "./Shared/Data/TokenVerification";

function App() {
  return (
    <div>
      <div className="content-position">
        <Navbar />
        <Content />
      </div>
      <TokenVerification />
    </div>
  );
}

export default App;
