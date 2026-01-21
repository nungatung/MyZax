import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Shop Wholesale | Zax Reliable Services",
  description: "Shop our full inventory of high-quality business essentials.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}