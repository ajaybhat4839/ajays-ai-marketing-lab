export const dynamic = "force-dynamic";
"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";


export default function Email(){


const [prompt,setPrompt]=useState("");
const [output,setOutput]=useState("");
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");



async function generate(){


if(!prompt.trim()){

setError("Please enter email topic");

return;

}


setLoading(true);
setOutput("");
setError("");



try{


const res = await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:
`Write a professional marketing email about:
${prompt}`

})

});



const data = await res.json();



if(!res.ok){

throw new Error(
data.error || "Generation failed"
);

}



setOutput(data.result);



const supabase = getSupabase();



const {
data:userData
}=await supabase.auth.getUser();



if(userData.user){


await supabase
.from("generations")
.insert({

user_id:userData.user.id,

type:"Email",

prompt,

result:data.result

});


}



}

catch(err:any){

setError(err.message);

}


setLoading(false);


}





return (

<div className="
min-h-screen
bg-black
text-white
p-10
">


<h1 className="
text-4xl
font-bold
">

Email Writer 📧

</h1>


<p className="text-gray-400 mt-3">

Create professional marketing emails using AI

</p>




<textarea

className="
mt-8
w-full
min-h-[180px]
p-5
rounded-xl
bg-white/10
border
border-white/10
"

placeholder="Enter email campaign topic"

value={prompt}

onChange={(e)=>setPrompt(e.target.value)}

/>




<button

onClick={generate}

disabled={loading}

className="
mt-5
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
"Writing..."
:
"Generate Email"
}

</button>



{
error && (

<p className="mt-5 text-red-400">

{error}

</p>

)

}



{
output && (

<div className="
mt-8
p-6
bg-white/10
rounded-xl
whitespace-pre-line
">


<h2 className="text-xl font-bold mb-4">

Generated Email

</h2>


{output}


</div>

)

}



</div>

)

}