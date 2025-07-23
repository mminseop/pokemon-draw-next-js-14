import "./globals.css";
import Header from "./components/Header";
import { Providers } from "./RTK/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
