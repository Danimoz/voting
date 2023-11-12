import { getErrorMessage } from "@/lib/getErrorMessage"
import prisma from "@/lib/prisma"

export async function GET(){
  try {
    const candidates = await prisma.candidate.findMany({})
    return candidates
  } catch(error) {
    return {
      error: getErrorMessage(error)
    }
  }
}