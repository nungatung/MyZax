import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About | Zax Reliable Services",
  description: "Learn more about Zax Reliable Services and our commitment to quality and reliability.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}