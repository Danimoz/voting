'use server';

import { getErrorMessage } from "./getErrorMessage";
import prisma from "./prisma";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";


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
  
  try {
    await prisma.candidate.create({
      data: {name}
    })
    revalidatePath('/')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function updateScore(id: number, score: number) {
  try {
    await prisma.candidate.update({
      where: { id: Number(id) },
      data: { count: Number(score) }
    })
    revalidatePath('/')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function getCandidates() {
  try {
    const candidates = await prisma.candidate.findMany({})
    return candidates
  } catch(error) {
    return {
      error: getErrorMessage(error)
    }
  }
}

