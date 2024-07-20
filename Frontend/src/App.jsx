
import "./App.css";
import { Provider } from "react-redux";
import Loginpage from "./Pages/Loginpage.jsx";
import { store } from "./Store/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerifyEmail from "./Pages/verify-email.jsx";
import AuthRoute from "./Utils/AuthRoute.jsx";
import Create from "./Component/Create-Doc/CreateDoc.jsx";
import Register from "./Pages/RegisterPage.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <h1>I am Home Page</h1>,
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
      // element: <AuthRoute element={<DocumentProvider><EditorProvider><Document /></EditorProvider></DocumentProvider>} />,
    },
  ]);
  
    
  return (
    <Provider store={store}>
    <RouterProvider router={appRouter}>
       <ToastContainer
        position='top-center'
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Loginpage />
    </RouterProvider>
    </Provider>
  );
}

export default App;
