"use client";

import { useState } from "react";

const buildFallbackPortrait = (initials = "AA") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="900" viewBox="0 0 800 900">
      <rect width="800" height="900" fill="#fdf8ef" />
      <rect x="42" y="42" width="716" height="816" rx="28" fill="#16265a" fill-opacity="0.08" />
      <circle cx="400" cy="330" r="170" fill="#e8871e" fill-opacity="0.14" />
      <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-size="200" fill="#e8871e" font-family="Arial, Helvetica, sans-serif" font-weight="700">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export default function MemberPortrait({ src, alt, initials, className = "photo" }) {
  const [imageSrc, setImageSrc] = useState(src ?? buildFallbackPortrait(initials));

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      onError={(event) => {
        event.currentTarget.onerror = null;
        setImageSrc(buildFallbackPortrait(initials));
      }}
    />
  );
}
