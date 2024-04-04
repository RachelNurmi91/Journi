import { produce } from "immer";

import { TOGGLE_SIDEBAR } from "../Actions/UiActions";

const initialState = {
  showSidebar: false,
};

export { initialState };

export default produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      console.log("reducer");
      draft.showSidebar = !draft.showSidebar;
      console.log(JSON.parse(JSON.stringify(draft)));
      return draft;
    default:
      return draft;
  }
}, initialState);
