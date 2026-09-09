import "./globals.css";

export const metadata = {
  title: "आई रेमाई देवी | Aai Remai Devi Foundation",
  description:
    "आई रेमाई देवी — सेवा, संस्कार, समर्पण, विकास. A rural empowerment foundation working across Maharashtra on water, health, education and livelihoods.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Hind:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
