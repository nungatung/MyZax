import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact | Zax Reliable Services",
  description: "Get in touch with Zax for support, inquiries, or bulk orders.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}