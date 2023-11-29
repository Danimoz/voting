'use client';

import { addCandidate } from "@/lib/actions";
import Loader from "@/lib/loader";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function NewCandidate() {
  const newCandidate = async (formData: FormData) => {
    const res = await addCandidate(formData)
    if (res?.error) toast.error(res.error)
    else toast.success('Successfully Added')
  }

  return (
    <section className="container mx-auto">
      <h2 className="text-center font-bold text-2xl">New Candidate</h2>

      <form className="mt-6" action={newCandidate}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-normal mb-1">Name</label>
          <input type="text" name='name' id="name" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter Candidate Name" required />
        </div>
        <SubmitButton />
      </form>
    </section>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <div className="flex justify-center">
      <button aria-disabled={pending} className="rounded-xl shadow-xl px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white">{pending ? <Loader /> : 'Submit' }</button>
    </div>
  )
}