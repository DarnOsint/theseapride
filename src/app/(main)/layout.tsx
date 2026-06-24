import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getSiteConfig } from "@/lib/site-config";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <>
      <Header config={config} />
      <main className="min-h-screen">{children}</main>
      <Footer config={config} />
      <FloatingWhatsApp number={config.whatsapp_number} />
    </>
  );
}
