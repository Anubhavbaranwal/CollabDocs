import "./App.css";
import Loginpage from "./Pages/Loginpage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerifyEmail from "./Pages/verify-email.jsx";
import AuthRoute from "./Utils/AuthRoute.jsx";
import Create from "./Pages/DocumentCreate.jsx";
import Register from "./Pages/RegisterPage.jsx";
import { DocumentProvider } from "./Context/Document.jsx";
import { EditorProvider } from "./Context/Editor.context.jsx";
import Document from "./Pages/DocumentPage.jsx";
import Homepage from "./Pages/HomePage.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element:<Homepage/>,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Loginpage />,
    },
    {
      path: "/user/verify-email/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/document/create",
      element: <AuthRoute element={<Create />} />,
    },
    {
      path: "/document/:id",
      element: (
        <AuthRoute
          element={
            <DocumentProvider>
              <EditorProvider>
                <Document />
              </EditorProvider>
            </DocumentProvider>
          }
        />
      ),
    },
  ]);

  return (
    <RouterProvider router={appRouter}>
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Loginpage /> */}
    </RouterProvider>
  );
}

export default App;
