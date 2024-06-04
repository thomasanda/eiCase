import { configureStore } from "@reduxjs/toolkit";
import { portfolioApi } from "../services/portfolio";
import { propertyApi } from "@/services/properties";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      portfolioApi.middleware,
      propertyApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
