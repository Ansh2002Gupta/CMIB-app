import React, { useRef, useEffect } from 'react';
import { View } from '@unthinkable/react-core-components';
import PropTypes from 'prop-types';

import styles from './popover.style';

const Popover = ({ closePopover, content, isVisible }) => {
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
    <View style={styles.popoverContainer}>
      {isVisible && <View ref={popoverRef}>{content}</View>}
    </View>
  );
};

Popover.propTypes = {
  closePopover: PropTypes.func,
  content: PropTypes.element,
  isVisible: PropTypes.bool,
};

export default Popover;
