import PremiumModal from "@/components/premium/PremiumModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <PremiumModal />
    </div>
  );
}
