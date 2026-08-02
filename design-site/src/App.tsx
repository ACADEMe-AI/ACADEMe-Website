import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DocPage from "./pages/DocPage";
import { navGroups } from "./lib/nav";

const docPaths = navGroups.flatMap((g) => g.items.map((i) => i.path));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {docPaths.map((path) => (
          <Route
            key={path}
            path={path.startsWith("/") ? path.slice(1) : path}
            element={<DocPage />}
          />
        ))}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
