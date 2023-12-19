import React, {  useRef, useEffect } from 'react';
import PropTypes from "prop-types";

import styles from './popover.style';

const Popover = ({closePopover, content, isVisible }) => {
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      isVisible
    ) {
      closePopover();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div style={styles.popoverContainer}>
      {isVisible && <div ref={popoverRef}>{content}</div>}
    </div>
  );
};

Popover.propTypes = {
  closePopover: PropTypes.func,
  content: PropTypes.element,
  isVisible: PropTypes.bool,

  
}

export default Popover;
