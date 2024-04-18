import { produce } from "immer";

import { TOGGLE_SIDEBAR } from "../Actions/UiActions";

const initialState = {
  showSidebar: false,
};

export { initialState };

export default produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      draft.showSidebar = !draft.showSidebar;
      return draft;
    default:
      return draft;
  }
}, initialState);
