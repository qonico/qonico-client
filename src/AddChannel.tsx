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
  onClose: (id?: string, variable?: string) => void,
};

const AddChannel = (props: Props) => {
  const {
    open,
    onClose,
  } = props;
  const [id, setId] = useState('');
  const [variable, setVariable] = useState('');

  const handleClose = () => {
    setId('');
    setVariable('');
    onClose();
  }

  const handleSubmit = () => {
    onClose(id, variable);
    setId('');
    setVariable('');
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the id and the variable of the new channel
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="Channel ID"
          type="text"
          fullWidth
          onChange={(event) => setId(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="variable"
          label="Channel Variable"
          type="text"
          fullWidth
          onChange={(event) => setVariable(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!id || !variable}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddChannel;