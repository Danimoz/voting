import Vote from '@/components/vote';
import { getCandidates } from '@/lib/actions'

export default async function Home() {
  const candidates = await getCandidates();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h2 className='text-3xl font-bold'>JC Exchange Referral Contest</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        {!('error' in candidates) && candidates?.map((candidate) => (
          <div key={candidate.id} className='shadow-2xl'>
            <div className='p-6'>
              <h2 className='text-xl font-bold'>{candidate.name}</h2>
              <p>{candidate.description}</p>
              <Vote candidateId={candidate.id} candidateName={candidate.name} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
