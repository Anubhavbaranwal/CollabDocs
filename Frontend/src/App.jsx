
import "./App.css";
import { Provider } from "react-redux";
import Loginpage from "./Pages/Loginpage.jsx";
import { store } from "./Store/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Component/Signup/Signup.jsx";

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
      // element: <VerifyEmail />,
    },
    {
      path: "/document/create",
      // element: <AuthRoute element={<Create />} />,
    },
    {
      path: "/document/:id",
      // element: <AuthRoute element={<DocumentProvider><EditorProvider><Document /></EditorProvider></DocumentProvider>} />,
    },
  ]);
  
    
  return (
    <RouterProvider router={appRouter}>
    <Provider store={store}>
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
    </Provider>
    </RouterProvider>
  );
}

export default App;
