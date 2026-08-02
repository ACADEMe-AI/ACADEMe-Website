import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import DeleteData from "./pages/DeleteDataPage";
import DesignRoot from "./design/DesignRoot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/Privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/delete" element={<DeleteData />} />
        <Route path="/design/*" element={<DesignRoot />} />
      </Routes>
    </Router>
  );
}

export default App;
