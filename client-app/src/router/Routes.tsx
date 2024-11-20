import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginRegister from "../components/user/LoginRegister";
import Chat from "../components/chat/Chat";
import ProfilePage from "../components/profile/ProfilePage";
import GroupDetailsPage from "../components/chatGroup/GroupDetailsPage";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginRegister />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
      {
        path: "profiles/:username",
        element: <ProfilePage />,
      },
      {
        path: "groups/:groupId",
        element: <GroupDetailsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
