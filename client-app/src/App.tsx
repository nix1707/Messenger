import { useLayoutEffect } from "react";
import { useCommonStore } from "./state/useCommonStore";
import { useUserStore } from "./state/useUserStore";

import { RouterProvider } from "react-router";
import router from "./router/Routes";
import LoadingComponent from "./components/LoadingComponent";

function App() {
  const { getUser } = useUserStore();
  const { setAppLoaded, appLoaded, token } = useCommonStore();

  useLayoutEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded]);

  if(!appLoaded) return <LoadingComponent />

  return (
      <RouterProvider router={router} />
  );
}

export default App;
