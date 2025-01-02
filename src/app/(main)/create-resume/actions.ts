"use server";

import { getSession } from "@/utils/session";
import { resumeSchema, ResumeValues } from "@/schemas";
import prisma from "@/lib/prisma";
import { del, put } from "@vercel/blob";
import path from "path";

export default async function saveResume(values: ResumeValues) {
  const { id } = values;

  console.log("Values:", values);

  const {
    resumePhoto, workExperiences, educations, ...resumeValues
  } = resumeSchema.parse(values);


  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existingResume = id ? await prisma.resume.findUnique({
    where: { id, userId }
  })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (resumePhoto instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resumes_photos/${path.extname(resumePhoto.name)}`, resumePhoto, {
      access: "public"
    })

    newPhotoUrl = blob.url;
  } else if (resumePhoto === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined
          })))
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined
          })))
        },
        updatedAt: new Date(),
      }
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined
          })))
        },
        educations: {
          create: educations?.map((edu => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined
          })))
        },
        createdAt: new Date(),
      }
    });
  }
}