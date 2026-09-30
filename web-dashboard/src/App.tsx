import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import RequireRole from "./components/RequireRole";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerProfile from "./pages/SellerProfile";
import MonumentSeeder from "./pages/MonumentSeeder";
import PromoteUser from "./pages/PromoteUser";
import VerifySeller from "./pages/VerifySeller";

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireRole />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Login />} />

              <Route element={<RequireRole allowedRoles={["seller"]} />}>
                <Route path="/profile" element={<SellerProfile />} />
              </Route>

              <Route element={<RequireRole allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<VerifySeller />} />
                <Route path="/monuments" element={<MonumentSeeder />} />
                <Route path="/promote" element={<PromoteUser />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;
