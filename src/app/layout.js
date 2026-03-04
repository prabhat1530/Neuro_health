import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../components/ui/LanguageProvider";
import { AuthProvider } from "../components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Nuero Health | Healthcare Super App",
  description: "India's leading unified digital platform for healthcare.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
