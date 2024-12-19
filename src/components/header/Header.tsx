import Navbar from "./Navbar";
import { getSession } from "@/utils/session";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/10 backdrop-blur-lg">
      <div className="w-full mx-auto max-w-7xl">
        <Navbar user={user} />
      </div>
    </header>
  );
}
