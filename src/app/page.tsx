import { getSession } from "@/utils/session";
import LogoutButton from "./(auth)/(logout)/_components/LogoutButton";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return <p>Not signed in</p>;
  }

  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <p>First Name: {session.user.firstName || "No name provided"}</p>
      <p>Last Name: {session.user.lastName || "No name provided"}</p>
      <p>Session ID: {session.id}</p>
      <p>User ID: {session.user.id}</p>
      <p>Expires: {session.expires.toDateString()}</p>
      <LogoutButton />
    </div>
  );
}
