import { useEffect, useRef, useState } from "react";

export function QRCode({
  value,
  size = 168,
  className = "",
}: {
  value: string;
  size?: number;
  className?: string;
}) {
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
      <a className={className} href={value} target="_blank" rel="noreferrer">
        Open waitlist
      </a>
    );
  }

  return <canvas ref={canvasRef} className={className} width={size} height={size} />;
}
