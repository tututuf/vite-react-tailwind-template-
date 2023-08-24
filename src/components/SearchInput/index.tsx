import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchInputProps } from './types';
import SendIcon from '@mui/icons-material/Send'
import { Tooltip } from '@mui/material';

export default function CustomizedInputBase(props: SearchInputProps) {  
  return (
    <div className='shadow mb-[1rem] hover:shadow-xl transition'>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '50rem' }}
        onSubmit={ props.onSubmit }
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="请输入"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={ props.value }
          onChange={ props.onChange }
        />
        <Tooltip title="发送">
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
    
  );
}