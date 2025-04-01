import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
// import Login from "./Pages/Login";
import Home from "./Pages/Home";
// import SignUp from "./Pages/SignUp";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<Home />} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
