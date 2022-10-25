import { Alert, Snackbar } from '@mui/material';
import React from 'react'

function Notification(props) {

    const {notify, setNotify} = props;

    const handleClose = (event,reason) => {
      setNotify({
        ...notify,
        isOpen: false
      })
    }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={4000} //bude otevřemo po dobu 5 sec
      anchorOrigin={{ vertical: "top", horizontal: "right" }} //umístí notifikaci do horní části stránky uprostřed
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification