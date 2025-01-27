import { getSession } from "@/utils/session";
import Navbar from "./Navbar";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/10 backdrop-blur-lg">
      <div className="mx-auto w-full max-w-7xl">
        <Navbar user={user} />
      </div>
    </header>
  );
}
