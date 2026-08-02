import { useState, useEffect } from "react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#showcase", label: "App" },
];

const REGISTER_URL =
  "https://forms.clickup.com/90161070153/f/2kz09g29-456/VQATNDK2A8FV63QBYR";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when expanding back to full bar layout feels different
    if (!isScrolled) setIsMobileMenuOpen(false);
  }, [isScrolled]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? "mt-3 w-[min(92%,720px)] sm:w-[min(90%,780px)]"
            : "mt-0 w-full max-w-none"
        }`}
      >
        <nav
          className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? "rounded-full border border-border/80 bg-surface/85 shadow-[0_8px_40px_-12px_rgba(18,20,26,0.18)] backdrop-blur-xl"
              : "rounded-none border-b border-transparent bg-background/70 backdrop-blur-md"
          }`}
        >
          {/* Soft accent glow when compact */}
          {isScrolled && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/[0.04] via-transparent to-secondary/[0.05]"
            />
          )}

          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "h-14 px-4 sm:px-5"
                : "mx-auto h-[4.25rem] max-w-7xl px-5 sm:px-8 lg:px-12"
            }`}
          >
            {/* Brand */}
            <a
              href="/"
              className="group flex min-w-0 items-center gap-2.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span
                className={`relative flex shrink-0 items-center justify-center rounded-xl bg-surface2/80 ring-1 ring-border/60 transition-all duration-500 group-hover:ring-primary/30 ${
                  isScrolled ? "h-9 w-9" : "h-10 w-10"
                }`}
              >
                <img
                  src="/logos/logo-white-bg-removed.png"
                  alt="ACADEMe"
                  className={`object-contain transition-all duration-500 ${
                    isScrolled ? "h-5 w-5" : "h-6 w-6"
                  }`}
                />
              </span>
              <span
                className={`truncate font-semibold tracking-tight text-text-primary transition-all duration-500 group-hover:text-primary ${
                  isScrolled ? "text-[15px]" : "text-base sm:text-lg"
                }`}
              >
                ACADEMe
              </span>
            </a>

            {/* Desktop links */}
            <div
              className={`hidden items-center md:flex ${
                isScrolled ? "gap-1" : "gap-1 sm:gap-2"
              }`}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-surface2 hover:text-text-primary ${
                    isScrolled ? "px-3" : "px-3.5"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => window.open(REGISTER_URL, "_blank")}
                className={`ml-1 inline-flex items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25 active:scale-[0.98] ${
                  isScrolled ? "px-4 py-2" : "px-5 py-2.5"
                }`}
              >
                Register
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Mobile panel */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
              isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`border-t border-border/70 px-4 pb-4 pt-3 ${
                isScrolled ? "mx-2 mb-2 rounded-3xl bg-surface/50" : ""
              }`}
            >
              <div className="flex flex-col gap-1.5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-center text-sm font-medium text-text-secondary transition-colors hover:bg-surface2 hover:text-text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="mt-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.open(REGISTER_URL, "_blank");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
