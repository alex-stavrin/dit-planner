import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function GA4RouteChangeTracker() {
  const { pathname, search, hash } = useLocation();
  const lastPathRef = useRef("");

  useEffect(() => {
    const path = pathname + search + hash;
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;

    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: path
      });
    }
  }, [pathname, search, hash]);

  return null;
}
