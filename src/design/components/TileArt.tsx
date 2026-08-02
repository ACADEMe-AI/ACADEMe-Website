/** Tile decorations — ACADEMe-flavored (buddy / study / cube cues) */
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
      // Layered diamond monogram — brand mark cue, not the cube
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
          <circle cx="80" cy="80" r="10" fill="#6ec8ff" opacity="0.95" />
        </svg>
      );
    case "type":
      return (
        <div className="tile-art self-end text-[5.5rem] font-bold leading-none tracking-tight opacity-90">
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
          {["#5b6cff", "#0d9f6e", "#e86b2f", "#b8a0f0"].map((c) => (
            <span
              key={c}
              className="h-10 w-10 rounded-full ring-2 ring-black/5"
              style={{ background: c }}
            />
          ))}
        </div>
      );
    case "photo":
      // Expression set — reads as “mascot system”, not a single cartoon
      return (
        <svg
          className="tile-art"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden
        >
          {/* back plate */}
          <circle cx="56" cy="72" r="34" fill="currentColor" opacity="0.35" />
          <circle cx="104" cy="72" r="34" fill="currentColor" opacity="0.55" />
          {/* front face */}
          <circle cx="80" cy="88" r="38" fill="currentColor" opacity="0.95" />
          {/* eyes */}
          <circle cx="66" cy="82" r="5" fill="#6b3d8c" opacity="0.9" />
          <circle cx="94" cy="82" r="5" fill="#6b3d8c" opacity="0.9" />
          {/* happy smile */}
          <path
            d="M64 96 C70 108 90 108 96 96"
            stroke="#6b3d8c"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
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
