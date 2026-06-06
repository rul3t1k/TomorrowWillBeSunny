"use client";

import { useEffect } from "react";

export default function RealityBody() {
  useEffect(() => {
    document.documentElement.setAttribute("data-reality", "true");
    document.body.setAttribute("data-reality", "true");
    return () => {
      document.documentElement.removeAttribute("data-reality");
      document.body.removeAttribute("data-reality");
    };
  }, []);

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html:
          "document.documentElement.setAttribute('data-reality','true');document.body&&document.body.setAttribute('data-reality','true')"
      }}
    />
  );
}
