import Navbar from "./Navbar";
import { getSession } from "@/utils/session";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header>
      {/* Pass user data to Navbar */}
      <Navbar user={user} />
    </header>
  );
}
