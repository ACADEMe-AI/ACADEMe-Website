export default function TileArt({ kind }: { kind: string }) {
  switch (kind) {
    case "nodes":
      return (
        <svg className="tile-art" viewBox="0 0 160 160" fill="none">
          <circle cx="32" cy="42" r="9" fill="currentColor" opacity="0.9" />
          <circle cx="95" cy="108" r="9" fill="currentColor" opacity="0.9" />
          <circle cx="42" cy="128" r="9" fill="currentColor" opacity="0.9" />
          <path
            d="M32 42 L95 108 L42 128"
            stroke="currentColor"
            strokeWidth="2.5"
            opacity="0.75"
          />
        </svg>
      );
    case "quotes":
      return (
        <div className="tile-art flex w-full flex-1 items-center justify-between px-1 text-[5.5rem] font-bold leading-none opacity-90">
          <span>“</span>
          <span className="mb-2 self-end">”</span>
        </div>
      );
    case "mark":
      return (
        <svg
          className="tile-art"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden
        >
          <path
            d="M80 18 L142 80 L80 142 L18 80 Z"
            stroke="currentColor"
            strokeWidth="3.5"
            opacity="0.35"
          />
          <path
            d="M80 34 L126 80 L80 126 L34 80 Z"
            stroke="currentColor"
            strokeWidth="3.5"
            opacity="0.55"
          />
          <path
            d="M80 48 L112 80 L80 112 L48 80 Z"
            fill="currentColor"
            opacity="0.92"
          />
          <circle cx="80" cy="80" r="10" fill="#f5a800" opacity="0.95" />
        </svg>
      );
    case "type":
      return (
        <div
          className="tile-art self-end text-[5.5rem] leading-none opacity-90"
          style={{ fontFamily: '"Baloo 2", "Noto Sans", sans-serif', fontWeight: 800 }}
        >
          Aa
        </div>
      );
    case "icons":
      return (
        <div className="tile-art grid grid-cols-3 gap-2 opacity-85">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-7 w-7 rounded-md border-2 border-current" />
          ))}
        </div>
      );
    case "swatches":
      return (
        <div className="tile-art flex gap-2 self-end">
          {["#564cf1", "#f5a800", "#3ddc97", "#8b8cf5"].map((c) => (
            <span
              key={c}
              className="h-10 w-10 rounded-full ring-2 ring-black/5"
              style={{ background: c }}
            />
          ))}
        </div>
      );
    case "photo":
      return (
        <svg
          className="tile-art"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden
        >
          <ellipse cx="62" cy="40" rx="8" ry="14" fill="#a2a4fb" />
          <ellipse cx="80" cy="34" rx="9" ry="18" fill="#a2a4fb" />
          <ellipse cx="98" cy="40" rx="8" ry="14" fill="#a2a4fb" />
          <rect x="34" y="44" width="92" height="98" rx="40" fill="#6e71d6" />
          <rect x="50" y="62" width="60" height="44" rx="16" fill="#ffffff" />
          <ellipse cx="68" cy="82" rx="5" ry="6.5" fill="#12141a" />
          <ellipse cx="92" cy="82" rx="5" ry="6.5" fill="#12141a" />
          <path
            d="M72 94 C76 100 84 100 88 94"
            stroke="#12141a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "curve":
      return (
        <svg className="tile-art" viewBox="0 0 160 120" fill="none">
          <path
            d="M18 92 C52 92 58 28 92 28 C126 28 122 92 152 42"
            stroke="currentColor"
            strokeWidth="3.5"
            opacity="0.9"
          />
          <circle cx="18" cy="92" r="7" fill="currentColor" />
          <circle cx="92" cy="28" r="7" fill="currentColor" />
          <circle cx="152" cy="42" r="7" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
