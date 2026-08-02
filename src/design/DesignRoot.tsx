/** Brand guidelines app — mounted at /design/* in the main marketing site. */
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DocPage from "./pages/DocPage";
import { ExpandProvider } from "./lib/expand";
import { navGroups } from "./lib/nav";
import { dpath } from "./lib/base";
import SmoothScroll from "./components/SmoothScroll";
import "./index.css";

const docPaths = navGroups.flatMap((g) => g.items.map((i) => i.path));

export default function DesignRoot() {
  return (
    <SmoothScroll>
      <ExpandProvider>
        <Routes>
          <Route index element={<HomePage />} />
          {docPaths.map((path) => (
            <Route
              key={path}
              path={path.startsWith("/") ? path.slice(1) : path}
              element={<DocPage />}
            />
          ))}
          <Route
            path="framework"
            element={<Navigate to={dpath("/foundations")} replace />}
          />
          <Route
            path="voice-and-tone"
            element={<Navigate to={dpath("/foundations/voice")} replace />}
          />
          <Route
            path="logo"
            element={<Navigate to={dpath("/foundations/logo")} replace />}
          />
          <Route
            path="typography"
            element={<Navigate to={dpath("/foundations/type")} replace />}
          />
          <Route
            path="iconography"
            element={<Navigate to={dpath("/product/structure")} replace />}
          />
          <Route
            path="color"
            element={<Navigate to={dpath("/foundations/color")} replace />}
          />
          <Route
            path="imagery"
            element={<Navigate to={dpath("/character")} replace />}
          />
          <Route
            path="motion"
            element={<Navigate to={dpath("/character/motion")} replace />}
          />
          <Route path="*" element={<Navigate to={dpath("/")} replace />} />
        </Routes>
      </ExpandProvider>
    </SmoothScroll>
  );
}
