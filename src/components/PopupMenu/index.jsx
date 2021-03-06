import React, { useRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./PopupMenu.scss";

const PopupMenu = ({ children, items, onClick, activeItem }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const blockRef = useRef(null);

  const clickOutsideCallback = useCallback((e) => {
    if (!e.path.includes(blockRef.current)) {
      setVisiblePopup(false);
    }
  }, []);

  const handleClick = (item) => {
    if (onClick) {
      onClick(item);
    }
    setVisiblePopup(false);
  };

  useEffect(() => {
    document
      .querySelector("body")
      .addEventListener("click", clickOutsideCallback);
    return () =>
      document
        .querySelector("body")
        .removeEventListener("click", clickOutsideCallback);
  }, [clickOutsideCallback]);

  return (
    <React.Fragment>
      <div onClick={() => setVisiblePopup(!visiblePopup)}>{children}</div>
      {visiblePopup && (
        <div ref={blockRef} className="popup-menu">
          <ul>
            {items.map((item, index) => (
              <li
                className={classNames({ active: item.value === activeItem })}
                onClick={handleClick.bind(this, item)}
                key={index}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

PopupMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default PopupMenu;
