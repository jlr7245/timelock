import React from 'react';
import './SiteListItem.styles.css';

import { getHMFrom5S } from '../../../shared/utils';

const SiteListItem = ({ url, time }) => {
  const [hours, minutes] = getHMFrom5S(time);
  return (
    <div className="sli">
      <div className="sli-site">
        <span className="sli-label">Site</span>
        <span className="site-url vga">{url}</span>
      </div>
      <div className="sli-time">
        <span className="sli-label">Time permitted</span>
        <div className="time-num">
          <span className="time vga">{hours}</span>
          <span className="sli-label">Hours</span>
          <span className="time vga">{minutes}</span>
          <span className="sli-label">Minutes</span>
        </div>
      </div>
    </div>
  );
};

export default SiteListItem;
