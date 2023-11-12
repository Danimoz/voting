'use server';

import { getErrorMessage } from "./getErrorMessage";
import prisma from "./prisma";
import { hash } from "bcrypt";
import fs from 'fs/promises';
import os from 'os'
import path from "path";
import { v2 as cloudinary } from 'cloudinary'
import { candidateSchema } from "./schemas";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function createUser(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const existingUser = await prisma.user.findUnique({ where: { email: email as string }})
    if (existingUser) throw 'User already exist';

    const hashedPassword = await hash(password as string, 10)
    
    await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword }
    })
  } catch(error) {
    return { 
      error: getErrorMessage(error)
    }
  }
}


export async function addCandidate(formData: FormData){
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as File
  
  try {
    const data = candidateSchema.parse({ name, description, image })
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `${image.name}`)
    fs.writeFile(uploadDir, buffer)

    const imageUrl = await cloudinary.uploader.upload(uploadDir, { folder: 'voting' })
    fs.unlink(uploadDir)

    await prisma.candidate.create({
      data: {
        name, description, image: imageUrl.secure_url
      }
    })
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function getCandidates() {
  try {
    const candidates = await prisma.candidate.findMany({})
    console.log(candidates)
    return candidates
  } catch(error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function voteForCandidate(userId: string, candidateId: number){
  const session = await getServerSession(options);
  try {
    if (!session) throw 'Login to Vote'
    if (!userId) throw 'Login to Vote'
    const user = await prisma.user.findUnique({
      where: { email: userId }
    })
    console.log(userId)
    await prisma.vote.create({
      data: { userId: userId, candidateId }
    })
  } catch(error) {
    console.log(error)
    return {
      error: getErrorMessage(error)
    }
  }
}