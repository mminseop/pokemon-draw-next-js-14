import "./globals.css";
import Header from "./components/Header";
import { Providers } from "./RTK/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
         <title>포켓몬 도감</title>
        <meta name="google-site-verification" content="7Jyxop61CiR39eKHfRyGHigXt0xcrMnx7Mk9Pm8VJ_c" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
