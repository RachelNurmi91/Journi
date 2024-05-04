import "./Styles.scss";
import Navbar from "./Layout/Navbar";
import Routes from "./Layout/Routes";
import TokenVerification from "./Shared/Data/TokenVerification";

function App() {
  return (
    <div>
      <div className="content-position">
        <Navbar />
        <Routes />
      </div>
      <TokenVerification />
    </div>
  );
}

export default App;
