import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faSuitcaseRolling,
  faPlaneDeparture,
  faPlaneArrival,
  faPlane,
  faCalendarDays,
  faPlus,
  faXmark,
  faArrowRightFromBracket,
  faRightToBracket,
  faTrash,
  faTrain,
  faVanShuttle,
  faMap,
  faCar,
  faBus,
  faShip,
  faShieldHalved,
  faNoteSticky,
  faBed,
  faCamera,
  faCircleExclamation,
  faClock,
  faMountainCity,
  faUserPen,
  faHotel,
  faHouse,
  faChevronLeft,
  faPenToSquare,
  faAngleDown,
  faAngleUp,
  faUserPlus,
  faFerry,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { faFaceFlushed } from "@fortawesome/free-regular-svg-icons";

library.add(
  faSuitcaseRolling,
  faFaceFlushed,
  faPlaneDeparture,
  faPlaneArrival,
  faCircleExclamation,
  faPlane,
  faCalendarDays,
  faClock,
  faMap,
  faPlus,
  faXmark,
  faArrowRightFromBracket,
  faRightToBracket,
  faMountainCity,
  faTrash,
  faTrain,
  faFerry,
  faVanShuttle,
  faCamera,
  faUserPen,
  faCar,
  faBus,
  faShip,
  faShieldHalved,
  faNoteSticky,
  faBed,
  faHouse,
  faHotel,
  faPenToSquare,
  faChevronLeft,
  faAngleDown,
  faAngleUp,
  faUserPlus,
  faBars
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
