"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);



  async function login(e: React.FormEvent){

    e.preventDefault();

    setError("");
    setLoading(true);


    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });



    if(error){

      setError(error.message);
      setLoading(false);
      return;

    }


    router.push("/dashboard");

  }



return (

<div className="
min-h-screen
bg-black
text-white
flex
items-center
justify-center
p-6
">


<div className="
w-full
max-w-md
bg-white/10
p-8
rounded-2xl
">


<h1 className="
text-4xl
font-bold
mb-8
">

Login 🚀

</h1>



<form onSubmit={login}>


<input

type="email"

required

className="
w-full
p-4
rounded-xl
bg-white/10
border
border-white/20
"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

required

className="
mt-5
w-full
p-4
rounded-xl
bg-white/10
border
border-white/20
"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>



{
error && (

<p className="text-red-400 mt-4">

{error}

</p>

)
}




<button

type="submit"

disabled={loading}

className="
mt-6
w-full
px-8
py-3
bg-white
text-black
rounded-xl
"

>

{
loading
?
"Logging in..."
:
"Login"
}

</button>


</form>




<p className="
text-center
mt-6
text-gray-400
">

Don't have an account?{" "}


<a

href="/signup"

className="
text-blue-400
font-semibold
"

>

Create account

</a>


</p>



</div>


</div>


)

}