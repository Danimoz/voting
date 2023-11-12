import Link from "next/link";
import SignUpForm from "./form";

export default function SignUp(){

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm md:max-w-md p-6 rounded-3xl shadow-2xl">
        <h2 className="text-3xl text-center font-bold">Sign Up</h2>
        <p className="mt-4 text-xl text-center">Have an account? <Link href='/login' className="font-bold">Login instead</Link></p>

        <SignUpForm />

      </div>
    </section>
  )
}