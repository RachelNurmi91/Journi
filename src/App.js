import './App.css';
import Nav from './Layout/Nav'
import Routes from './Layout/Routes';

function App() {
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <Nav/>
          </div> <div className="col py-3">
            <Routes />
        </div>
          </div></div>
  );
}

export default App;
