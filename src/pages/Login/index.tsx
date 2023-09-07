import { Button, TextField } from '@mui/material';
import { useState, ChangeEvent, FormEvent } from 'react';
import { loginApi } from '@/api';
import MessageBox from '@/components/MessageBox';
import { ResType } from '@/api/types/response';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    psw: ''
  });
  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res = await loginApi(formData);
    MessageBox[res.type](res.msg);
    if (res.type === ResType.SUCCESS) {
      localStorage.setItem('user.token', 'Bearer' + ' ' + res.data.token);
      navigate('/main/Gpt');
    }
  };

  const checkAccount = (): boolean => {
    return false;
  };

  const checkPsw = (): boolean => {
    return false;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-400">
      <div className="w-[30rem] bg-[#dddddd90] rounded-lg">
        <form
          className="flex p-[2rem] flex-col items-center"
          onSubmit={loginHandler}
        >
          <TextField
            error={checkAccount()}
            id="outlined-error"
            label="账号"
            value={formData.username}
            variant="standard"
            name="username"
            onChange={changeInputHandler}
            className="w-[70%]"
          />
          <TextField
            error={checkPsw()}
            id="outlined-error"
            label="密码"
            value={formData.psw}
            type="password"
            variant="standard"
            name="psw"
            onChange={changeInputHandler}
            className="w-[70%]"
            style={{ marginTop: 20 }}
          />
          <div className="mt-6">
            <Button type="submit" size="small" variant="contained">
              登录
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
