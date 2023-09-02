import { useState } from 'react';
import { Snackbar, Alert, SnackbarProps } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { ResType } from '@/api/types/response';

interface CustomSnackBarProps extends SnackbarProps {
  message: string;
  type: ResType;
}

type MessageBoxInter = {
  [T in ResType]: (message: string) => void;
};

const duration = 2000;
let dom: HTMLDivElement;

const MessageBox: MessageBoxInter = {
  success: (message: string) => {
    showMessageBox(message, ResType.SUCCESS);
  },
  warning: (message: string) => {
    showMessageBox(message, ResType.FAIL);
  },
  error: (message: string) => {
    showMessageBox(message, ResType.Error);
  }
};

const showMessageBox = (msg: string, type: ResType) => {
  dom = document.createElement('div');
  const JSXdom = (
    <CustomSnackBar
      message={msg}
      autoHideDuration={duration}
      type={type}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    />
  );
  ReactDOM.createRoot(dom).render(JSXdom);
  document.body.append(dom);
};

const CustomSnackBar = (props: CustomSnackBarProps) => {
  const [open, setOpen] = useState(true);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setTimeout(() => {
      dom.remove();
    }, 500);
  };
  return (
    <Snackbar {...props} open={open} onClose={handleClose}>
      <Alert severity={props.type} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default MessageBox;
