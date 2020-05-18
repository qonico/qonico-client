import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
}
from '@material-ui/core';

type Props = {
  open: boolean,
  onClose: (dataNodeUrl?: string) => void,
};

const AddExistingDataNode = (props: Props) => {
  const {
    open,
    onClose,
  } = props;
  const [address, setAddress] = useState('');

  const handleClose = () => {
    setAddress('');
    onClose();
  }

  const handleSubmit = () => {
    onClose(address);
    setAddress('');
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Existing DataNode</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the address of the existing DataNode
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="DataNode Address"
          type="text"
          fullWidth
          onChange={(event) => setAddress(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!address}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddExistingDataNode;