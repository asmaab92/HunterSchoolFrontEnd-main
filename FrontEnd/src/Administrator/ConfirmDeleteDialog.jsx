import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm, item, itemType }) => {
  let itemDescription;
  switch (itemType) {
    case 'user':
      itemDescription = `the user ${item?.userName || ''}`;
      break;
    case 'question':
      itemDescription = `question ${item?.id || ''}`;
      break;
    case 'flashCard':
      itemDescription = `flash card ${item?.id || ''}`;
      break;
    default:
      itemDescription = '';
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {itemDescription}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
