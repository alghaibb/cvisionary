import { getSession } from "@/utils/session";
import { Metadata } from "next";
import CreateResume from "./CreateResume";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/types/create-resume";

interface CreateResumePageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Create Your Resume",
};

export default async function Page({ searchParams }: CreateResumePageProps) {
  const session = await getSession();
  const user = session?.user.id;

  const { resumeId } = await searchParams;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId: user },
        include: resumeDataInclude,
      })
    : null;

  return <CreateResume resumeToEdit={resumeToEdit} />;
}
