"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";


export default function SignupPage() {

  const router = useRouter();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (!form.name || !form.email || !form.password) {

      setError("All fields are required");
      return;

    }


    if (form.password.length < 6) {

      setError("Password must be at least 6 characters");
      return;

    }



    try {

      setLoading(true);


      const supabase = getSupabase();


      const { data, error } =
        await supabase.auth.signUp({

          email: form.email,
          password: form.password,

          options: {

            data: {
              name: form.name,
            },

          },

        });



      if (error) {
        throw error;
      }


      console.log(data);


      setSuccess(
        "Account created successfully!"
      );


      setTimeout(() => {

        router.push("/login");

      },1500);



    } catch(err:any){

      setError(err.message);


    } finally {

      setLoading(false);

    }

  }




  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">


      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">


        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>



        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >


          <input

            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"

          />



          <input

            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"

          />



          <input

            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"

          />



          {error && (

            <p className="text-red-500 text-sm">

              {error}

            </p>

          )}



          {success && (

            <p className="text-green-600 text-sm">

              {success}

            </p>

          )}




          <button

            disabled={loading}

            className="w-full bg-black text-white py-3 rounded-lg"

          >

            {loading
              ? "Creating..."
              : "Sign Up"}

          </button>



        </form>



        <p className="text-center text-sm mt-4">

          Already have account?{" "}

          <a
            href="/login"
            className="text-blue-600"
          >

            Login

          </a>

        </p>


      </div>


    </div>

  );

}