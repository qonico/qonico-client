import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {
  Dashboard as DashboardIcon,
  DeviceHub as DeviceHubIcon,
  Add as AddIcon,
}from '@material-ui/icons';
import { DataNode } from './qonico.service';

export type ActionList = 'AddNewDataNode' | 'AddExistingDataNode';

type MainProps = {
  dataNodes: DataNode[],
  onClick: (action: string) => void,
};

type ActionProps = {
  onClick: (action: ActionList) => void,
};

export const MainListItems = (props: MainProps) => {
  const { dataNodes, onClick } = props;
  
  return (
    <div>
      <ListItem button onClick={() => onClick('dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      { dataNodes.map(dn => (
        <ListItem button key={dn.id} onClick={() => onClick(dn.id)}>
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary={dn.name} />
        </ListItem>
      ))}
    </div>
  );
};

export const ActionListItems = (props: ActionProps) => {
  const { onClick } = props;

  return (
    <div>
      <ListSubheader inset>Actions</ListSubheader>
      <ListItem button onClick={() => onClick('AddNewDataNode')}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="New DataNode" />
      </ListItem>
      <ListItem button onClick={() => onClick('AddExistingDataNode')}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Existing DataNode" />
      </ListItem>
    </div>
  );
};