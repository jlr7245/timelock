import React, { useState } from 'react';
import './SiteList.styles.css';

import { Modal } from '../../../shared-components';

const SiteList = () => {
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState([
    { url: 'twitter.com', time: 5 },
    { url: 'facebook.com', time: 5 },
    { url: 'tumblr.com', time: 5 },
  ]);
  // chrome.storage.sync.get('config', result => {
  //   const configJson = JSON.parse(result.config);
  //   setConfig(configJson);
  // });
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
      {config.length && <div>List of sites here</div>}
    </div>
  );
};

export default SiteList;
