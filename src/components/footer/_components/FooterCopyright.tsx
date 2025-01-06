export default function FooterCopyright() {
  return (
    <p className="text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} CVisionary. All rights reserved.
    </p>
  );
}
