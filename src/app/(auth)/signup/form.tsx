'use client';

import { createUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function SignUpForm() {

  const router = useRouter();
  
  async function clientAction(formData: FormData){
    const result = await createUser(formData);
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Successful')
      router.push('/')
    }
  }

  return (
    <form className="mt-4" action={clientAction}>
      <div className="mb-4">
        <label htmlFor="firstName" className="block font-normal mb-1">First Name</label>
        <input type="text" name='firstName' id="firstName" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter First Name" required />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block font-normal mb-1">Last Name</label>
        <input type="text" name='lastName' id="lastName" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter First Name" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-normal mb-1">Email</label>
        <input type="email" name='email' id="email" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter Email" required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-normal mb-1">Password</label>
        <input type="password" name='password' id="password" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter Password" required />
      </div>

      <div className="flex justify-center">
        <button className="p-3 bg-blue-600 text-white rounded-xl" type="submit">Sign Up</button>
      </div>
    </form>
  )
}