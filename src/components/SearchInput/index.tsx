import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { SearchInputProps } from './types';

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
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
    
  );
}