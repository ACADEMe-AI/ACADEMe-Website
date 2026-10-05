/** Brand guidelines app — mounted at /design/* on the ACADEMe website. */
import { useEffect } from "react";
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
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    // Main site scales root rem fluidly — design was built at 16px.
    const prev = {
      htmlBg: root.style.background,
      htmlFont: root.style.fontSize,
      bodyBg: body.style.background,
      bodyColor: body.style.color,
      bodyFont: body.style.fontFamily,
      overflow: body.style.overflow,
      overflowX: body.style.overflowX,
    };

    root.classList.add("on-design-site");
    body.classList.add("on-design-site");
    root.style.background = "#fff";
    root.style.fontSize = "16px";
    body.style.background = "#fff";
    body.style.color = "#0f1115";
    body.style.fontFamily = 'Archivo, "Helvetica Neue", Arial, sans-serif';
    body.style.overflowX = "hidden";

    document.title = "ACADEMe Design System";

    return () => {
      root.classList.remove("on-design-site");
      body.classList.remove("on-design-site");
      root.style.background = prev.htmlBg;
      root.style.fontSize = prev.htmlFont;
      body.style.background = prev.bodyBg;
      body.style.color = prev.bodyColor;
      body.style.fontFamily = prev.bodyFont;
      body.style.overflow = prev.overflow;
      body.style.overflowX = prev.overflowX;
      document.title = "ACADEMe — Study smarter. In your pocket.";
    };
  }, []);

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
