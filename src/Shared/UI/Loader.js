import { jellyTriangle } from "ldrs";

function Loader() {
  jellyTriangle.register();
  return (
    <l-jelly-triangle size="50" speed="1.75" color="#0BB6C0"></l-jelly-triangle>
  );
}

export default Loader;
