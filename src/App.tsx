import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/ui/Nav";
import { Footer } from "./components/ui/Footer";
import { ScrollExperience } from "./components/ScrollExperience";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { SectionJump } from "./components/ui/SectionJump";
import { QrModal } from "./components/ui/QrModal";
import { BrandLoader } from "./loader";

const DesignRoot = lazy(() => import("./design/DesignRoot"));

function WebsiteApp() {
  const [loading, setLoading] = useState(true);
  const forceLoader =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("loader") === "1";

  return (
    <>
      {}
      <BrandLoader force={forceLoader} onFinished={() => setLoading(false)} />
      <SmoothScroll>
        <div id="top" className="app" aria-hidden={loading || undefined}>
          <ScrollProgress />
          <Nav />
          <main>
            {}
            <ScrollExperience enableFilm={!loading} />
          </main>
          <SectionJump />
          <QrModal />
          <div id="cta" className="post-story">
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}

function DesignFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "Archivo, system-ui, sans-serif",
        color: "#5b6cff",
        background: "#fff",
      }}
    >
      Loading design system…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/design/*"
          element={
            <Suspense fallback={<DesignFallback />}>
              <DesignRoot />
            </Suspense>
          }
        />
        <Route path="/*" element={<WebsiteApp />} />
      </Routes>
    </BrowserRouter>
  );
}
