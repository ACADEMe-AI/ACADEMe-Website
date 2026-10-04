import { PLAY_LIVE, PLAY_URL } from "../../lib/constants";
import { openQrModal } from "./QrModal";

function PlayIcon() {
  return (
    <svg className="btn-flow-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.6 1.7c-.3.2-.5.5-.5.9v18.8c0 .4.2.7.5.9l.1.1 10.5-10.5v-.3L3.7 1.6l-.1.1zm12.2 7L13 11.5l2.9 2.9 3.4-1.9c.9-.5.9-1.4 0-1.9l-3.5-1.9zM4.3 21.7l8.9-8.9 2.5 2.5-9.8 5.6c-.7.4-1.4.2-1.6-.2zm0-19.4C4.6 2 5.2 1.8 6 2.2l9.8 5.6-2.5 2.5L4.3 2.3z" />
    </svg>
  );
}

export function PlayCta({ id }: { id: string }) {
  if (!PLAY_LIVE) {
    return (
      <span className="btn-flow primary is-soon" aria-disabled="true">
        <span className="btn-flow-label">
          <PlayIcon />
          Coming soon on Google Play
        </span>
      </span>
    );
  }

  return (
    <>
      <a className="btn-flow primary" href={PLAY_URL} target="_blank" rel="noreferrer">
        <span className="btn-flow-label">
          <PlayIcon />
          Get it on Google Play
        </span>
      </a>
      <button
        type="button"
        className="btn-flow icon"
        id={id}
        aria-label="Show QR code"
        title="Scan to get the app"
        onClick={(e) => openQrModal(e.currentTarget)}
      >
        <span className="btn-flow-label" aria-hidden>
          <svg className="btn-flow-icon" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M14 14h2.5v2.5H14V14zm4 0H20v2.5h-2V14zm-4 4H16.5V20H14v-2zm4 0H20V20h-2v-2z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </>
  );
}
