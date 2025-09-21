export const metadata = {
  title: "Tech Goddess Portfolio",
  description: "Favour Enwonwu — Frontend Developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
