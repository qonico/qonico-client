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

const AddNewDataNode = (props: Props) => {
  const {
    open,
    onClose,
  } = props;
  const [url, setUrl] = useState('');

  const handleClose = () => {
    setUrl('');
    onClose();
  }

  const handleSubmit = () => {
    onClose(url);
    setUrl('');
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the url on the new DataNode
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="DataNode URL"
          type="url"
          fullWidth
          onChange={(event) => setUrl(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!url}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewDataNode;