import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import DeleteData from "./pages/DeleteDataPage";
import DesignRoot from "./design/DesignRoot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/delete" element={<DeleteData />} />
        <Route path="/design/*" element={<DesignRoot />} />
      </Routes>
    </Router>
  );
}

export default App;
