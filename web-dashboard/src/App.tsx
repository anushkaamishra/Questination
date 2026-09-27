import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import RequireRole from "./components/RequireRole";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerProfile from "./pages/SellerProfile";
import ApprovalQueue from "./pages/ApprovalQueue";
import MonumentSeeder from "./pages/MonumentSeeder";
import PromoteUser from "./pages/PromoteUser";

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireRole />}>
            <Route element={<Layout />}>
              <Route path="/" element={<SellerProfile />} />
              <Route path="/profile" element={<SellerProfile />} />
              <Route path="/admin" element={<ApprovalQueue />} />
              <Route path="/monuments" element={<MonumentSeeder />} />
              <Route path="/promote" element={<PromoteUser />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;