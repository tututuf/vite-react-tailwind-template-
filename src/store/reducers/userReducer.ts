import { createSlice } from '@reduxjs/toolkit';

export const userSilce = createSlice({
  name: 'user',
  initialState: {
    user: {
      uername: '',
      age: 0
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSilce.actions;

export default userSilce.reducer;
