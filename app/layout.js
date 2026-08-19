export const metadata = {
  title: "Tech Goddess Portfolio",
  description:
    "Favour Enwonwu — Full-stack engineer with a frontend core",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
