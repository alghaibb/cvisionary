import Navbar from "./Navbar";
import { getSession } from "@/utils/session";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="w-full border-b border-muted bg-background">
      <div className="w-full mx-auto max-w-7xl">
        <Navbar user={user} />
      </div>
    </header>
  );
}
