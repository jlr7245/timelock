import React, { useState } from 'react';
import './SiteList.styles.css';

import { Modal } from '../../../shared';
// for dev
import { getFromStorage } from '../../../shared/utils.stub';
// for build
// import { getFromStorage } from '../../../shared/utils';


const SiteList = () => {
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState([]);
  getFromStorage('config', result => setConfig(result.config));
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
