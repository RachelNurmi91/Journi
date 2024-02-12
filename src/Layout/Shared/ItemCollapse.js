import { useRef, useEffect, useState } from "react";
import "./styles.css";

function ItemCollapse() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div ref={inputRef} className={`test ${isCollapsed ? "collapsed" : ""}`}>
        DOG
        <button type="button" onClick={handleCollapse}>
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
        {!isCollapsed && (
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse vel ultrices tortor. Aliquam iaculis aliquam urna.
              Vestibulum ut enim tincidunt, aliquam neque a, posuere felis. In
              mollis porta diam tempor vulputate. Sed cursus nibh turpis, a
              elementum enim bibendum eu. Nam aliquet erat eu elementum iaculis.
              In porta mollis ex.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ItemCollapse;
