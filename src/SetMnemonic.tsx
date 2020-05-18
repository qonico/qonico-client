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
  onClose: (mnemonic?: string) => void,
};

const SetMnemonic = (props: Props) => {
  const {
    open,
    onClose,
  } = props;
  const [mnemonic, setMnemonic] = useState('');

  const handleClose = () => {
    setMnemonic('');
    onClose();
  }

  const handleSubmit = () => {
    onClose(mnemonic);
    setMnemonic('');
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Mnemonic Wallet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the Mnemonic of the Wallet
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="mnemonic"
          label="Mnemonic Wallet"
          type="text"
          fullWidth
          onChange={(event) => setMnemonic(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!mnemonic}>
          Set
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SetMnemonic;