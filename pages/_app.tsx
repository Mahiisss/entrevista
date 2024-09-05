import "../styles/globals.css";
import "../styles/post.css";

import type { AppProps } from "next/app";
import { persistedStore } from "../store/store";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
