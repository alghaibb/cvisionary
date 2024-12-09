import { withAuth } from "@/utils/withAuth";

export default withAuth(async function Page() {
  return <main>Billing</main>;
});
