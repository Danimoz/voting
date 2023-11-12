'use client';

import { voteForCandidate } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type VoteProps = {
  candidateId: number
  candidateName: string
}


export default function Vote({ candidateId, candidateName }: VoteProps){
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(()=> {
    if (status === 'unauthenticated') router.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  async function handleVote() {
    const consent = confirm(`Are you sure you want to Vote for ${candidateName}?`);
    if (consent) {
      const res = await voteForCandidate(session?.user.email as string, candidateId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Successfully Voted');
      }
    }
  }
  

  return (
    <div className='my-4 flex justify-center'>
      <button 
        className='px-8 py-2 bg-blue-500 rounded'
        onClick={handleVote}
      >
        Vote!
      </button>
    </div>
  )
}
