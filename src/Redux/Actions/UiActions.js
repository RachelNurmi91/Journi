export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

export function toggleSidebar() {
  console.log("hit");
  return {
    type: TOGGLE_SIDEBAR,
  };
}
