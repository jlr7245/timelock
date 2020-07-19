import React, { useState, useEffect } from 'react';
import './SiteList.styles.css';

import { Modal } from '../../../shared';
// for dev
import { getFromStorage } from '../../../shared/utils.stub';
import SiteListItem from './SiteListItem';
// for build
// import { getFromStorage } from '../../../shared/utils';

const SiteList = () => {
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState([]);
  useEffect(
    () => getFromStorage('config', (result) => setConfig(result.config)),
    []
  );
  return (
    <div className="add-site-container">
      <button onClick={() => setShowModal(true)} className="base add-site vga">
        Add a site
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add a site">
          <p>Add site form goes here</p>
        </Modal>
      )}
      {config.length
        ? config.map((site, i) => <SiteListItem key={i} {...site} />)
        : null}
    </div>
  );
};

export default SiteList;
