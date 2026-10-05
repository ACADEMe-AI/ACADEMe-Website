import { useCallback, useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { WAITLIST_URL } from "../../lib/constants";
import { QRCode } from "./QRCode";

type OpenDetail = { rect: DOMRect };

/**
 * Simple QR modal: barcode + App Store / Google Play side by side.
 * No brand header, no “tap to open” copy, no Join button.
 */
export function openQrModal(origin: HTMLElement | null | undefined) {
  if (!origin) return;
  const rect = origin.getBoundingClientRect();
  window.dispatchEvent(
    new CustomEvent<OpenDetail>("academe:open-qr", { detail: { rect } })
  );
}

export function QrModal() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<DOMRect | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const goToLink = useCallback(() => {
    window.open(WAITLIST_URL, "_blank", "noopener,noreferrer");
  }, []);

  const close = useCallback(() => {
    const card = cardRef.current;
    const backdrop = backdropRef.current;
    const origin = originRef.current;
    if (!card || !backdrop) {
      setOpen(false);
      return;
    }

    tlRef.current?.kill();
    const final = card.getBoundingClientRect();
    const o = origin ?? {
      left: final.left + final.width / 2,
      top: final.top + final.height / 2,
      width: 44,
      height: 44,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    const dx = o.left + o.width / 2 - (final.left + final.width / 2);
    const dy = o.top + o.height / 2 - (final.top + final.height / 2);
    const sx = Math.max(0.08, o.width / final.width);
    const sy = Math.max(0.08, o.height / final.height);

    const tl = gsap.timeline({
      onComplete: () => setOpen(false),
    });
    tl.to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
    tl.to(
      card,
      {
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        opacity: 0.3,
        duration: 0.4,
        ease: "power3.in",
      },
      0
    );
    tlRef.current = tl;
  }, []);

  const openFrom = useCallback((rect: DOMRect) => {
    originRef.current = rect;
    setOpen(true);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<OpenDetail>;
      if (ce.detail?.rect) openFrom(ce.detail.rect);
    };
    window.addEventListener("academe:open-qr", onOpen as EventListener);
    return () => window.removeEventListener("academe:open-qr", onOpen as EventListener);
  }, [openFrom]);

  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    const backdrop = backdropRef.current;
    const origin = originRef.current;
    if (!card || !backdrop || !origin) return;

    gsap.set(card, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, clearProps: "" });
    const final = card.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (final.left + final.width / 2);
    const dy = origin.top + origin.height / 2 - (final.top + final.height / 2);
    const sx = Math.max(0.08, origin.width / final.width);
    const sy = Math.max(0.08, origin.height / final.height);

    tlRef.current?.kill();
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(card, {
      x: dx,
      y: dy,
      scaleX: sx,
      scaleY: sy,
      opacity: 0.5,
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline();
    tl.to(backdrop, { opacity: 1, duration: 0.42, ease: "power2.out" }, 0);
    tl.to(
      card,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.58,
        ease: "power4.out",
      },
      0.02
    );
    tlRef.current = tl;

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="qr-modal" role="presentation">
      <div
        ref={backdropRef}
        className="qr-modal-backdrop"
        onClick={close}
        aria-hidden
      />
      <div
        ref={cardRef}
        className="qr-modal-card qr-modal-simple"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button type="button" className="qr-modal-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 id={titleId} className="sr-only">
          Download ACADEMe
        </h2>

        {/* Simple barcode only */}
        <button
          type="button"
          className="qr-modal-code qr-modal-code-btn"
          onClick={goToLink}
          aria-label="Open ACADEMe link"
        >
          <QRCode value={WAITLIST_URL} size={220} className="qr-modal-canvas" />
        </button>

        {/* App Store + Google Play side by side */}
        <div className="qr-store-badges qr-store-row">
          <a
            className="qr-store-badge"
            href={WAITLIST_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Download on the App Store"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span>
              <small>Download on the</small>
              App Store
            </span>
          </a>
          <a
            className="qr-store-badge"
            href={WAITLIST_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Get it on Google Play"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M3.6 1.7c-.3.2-.5.5-.5.9v18.8c0 .4.2.7.5.9l.1.1 10.5-10.5v-.3L3.7 1.6l-.1.1zm12.2 7L13 11.5l2.9 2.9 3.4-1.9c.9-.5.9-1.4 0-1.9l-3.5-1.9zM4.3 21.7l8.9-8.9 2.5 2.5-9.8 5.6c-.7.4-1.4.2-1.6-.2zm0-19.4C4.6 2 5.2 1.8 6 2.2l9.8 5.6-2.5 2.5L4.3 2.3z" />
            </svg>
            <span>
              <small>GET IT ON</small>
              Google Play
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
