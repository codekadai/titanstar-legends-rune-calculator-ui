import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import { customMetadata } from "@/labels";
import { Providers } from "@/context/Providers";
import styles from "./layout.module.scss";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: customMetadata.title,
  description: customMetadata.description,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${styles.body}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
