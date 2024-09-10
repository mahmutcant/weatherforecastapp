import { configureStore } from '@reduxjs/toolkit';
import weather from './weather/index';

const store = configureStore({
  reducer: {
    weather,
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store