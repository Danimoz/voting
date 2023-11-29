'use client';

import { updateScore } from "@/lib/actions";
import { toast } from "sonner";

export default function UpdateCount({ id }: { id: number }) {
  const handleUpdateCount = (id: number) => async () => {
    const newScore = Number(prompt('Enter new score'));
    if (!newScore || newScore < 0 || isNaN(newScore)) {
      alert('Invalid score');
      return
    }
    const res = await updateScore(id, newScore)
    if (res?.error) toast.error(res.error)
    else toast.success('Successfully Updated')
  }
  
  return (
    <div>
      <button 
        className="rounded-xl shadow-xl px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white"
        onClick={handleUpdateCount(id)}
      >
      Update Count
    </button>
    </div>
  )
}