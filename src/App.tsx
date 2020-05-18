import React, { useState } from 'react';
import logo from './logo.svg';
import Dashboard from './Dashboard';
import './App.css';

import { setOwner, register, updateChannels } from './qonico.service';

// patient gather year develop must grain purity protect loop skill audit soft aisle hub erupt wet carpet essence hybrid muscle skirt lounge pet rocket

const App = () => {
  // const [mnemonic, setMnemonic] = useState<string>('');
  // const [newUrl, setNewUrl] = useState<string>('');
  // const [dataNode, setDataNode] = useState<string>('');
  // const onButtonSetOwnerClick = () => setOwner(mnemonic, newUrl);
  // const onButtonRegisterClick = () => register(mnemonic, dataNode);
  // const onButtonUpdateChannelsClick = () => updateChannels(mnemonic, dataNode);

  return (
    <div className="App">
      <Dashboard></Dashboard>
      {/* <input type="text" placeholder="url" onChange={(event) => setNewUrl(event.target.value)}/>
      <input type="text" placeholder="mnemonic" onChange={(event) => setMnemonic(event.target.value)}/>
      <input type="text" placeholder="dataNode" onChange={(event) => setDataNode(event.target.value)}/>
      <button onClick={onButtonRegisterClick}>Register</button>
      <button onClick={onButtonSetOwnerClick}>Set Owner</button>
      <button onClick={onButtonUpdateChannelsClick}>Update Channels</button> */}
    </div>
  );
}

export default App;
