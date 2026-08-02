import { useEffect, useRef, useState } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCode = ({ value, size = 168, className = "" }: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("qrcode").then((QRCodeLib) => {
      if (cancelled || !canvasRef.current) return;
      QRCodeLib.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 1,
        color: { dark: "#12141a", light: "#ffffff" },
      }).catch(() => {
        if (!cancelled) setError(true);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (error) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        Open the waitlist
      </a>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="QR code for the ACADEMe waitlist"
      className={className}
    />
  );
};

export default QRCode;