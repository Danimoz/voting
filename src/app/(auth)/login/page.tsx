'use client';

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const onSubmit = async(data: FormData) => {  
    try {
      const res = await signIn('credentials', {
        email: data.get('email'),
        password: data.get('password'),
        redirect: true,
        callbackUrl: '/'
      })
      console.log(res)
      //if (res && res.ok) router.replace('/')
    } catch (error) {
      toast.error('An error occured')
    }
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm md:max-w-md p-6 rounded-3xl shadow-2xl">
      <h2 className="text-3xl text-center font-bold">Login</h2>
        <p className="mt-4 text-xl text-center">New User? <Link href='/signup' className="font-bold">SignUp instead</Link></p>
        <form className="mt-4" action={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-normal mb-1">Email</label>
            <input type="email" name='email' id="email" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter Email" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-normal mb-1">Password</label>
            <input type="password" name='password' id="password" className="p-3 w-full border border-blue-500 rounded-md" placeholder="Enter Password" required />
          </div>

          <div className="flex justify-center">
            <button type='submit' className="p-3 bg-blue-600 text-white rounded-xl">Sign In</button>
          </div>
        </form>
      </div>
    </section>
  )
}
