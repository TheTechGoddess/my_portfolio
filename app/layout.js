import "./globals.css";
import PortfolioAnalyticsTracker from "../components/analytics/PortfolioAnalyticsTracker";

export const metadata = {
  title: "Tech Goddess Portfolio",
  description: "Favour Enwonwu — Full-stack engineer with a frontend core",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PortfolioAnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
