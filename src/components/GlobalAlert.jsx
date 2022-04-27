import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useState } from 'react'

const GlobalAlert = (props) => {
  const { message, isOpen, onClose } = props

  const { vertical, horizontal } = { vertical: 'top', horizontal: 'center' }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      onClose={() => onClose()}
      autoHideDuration={1000}
      key={vertical + horizontal}
    >
      <Alert onClose={() => onClose()} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalAlert
