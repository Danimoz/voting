import { getRankings } from "@/lib/actions"

export default async function ViewResult() {
  const candidates = await getRankings();
  
  return (
    <section className="container mx-auto">
      <h2 className="font-bold text-2xl">Results</h2>

      <div className="flex flex-col">
        {!('error' in candidates) && candidates.map((candidate) => (
          <div className=" p-2 border-b-2 shadow flex justify-between">
            <h2>{candidate.name}</h2>
            <h2>{candidate.voteCount}</h2>
          </div>
        ))}
      </div>
    </section>
  )
}