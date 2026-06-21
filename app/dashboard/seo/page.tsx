"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";


export default function SEOPage(){

const [prompt,setPrompt]=useState("");
const [result,setResult]=useState("");
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");



async function generate(){


if(!prompt.trim()){

setError("Please enter a website or topic");
return;

}


setLoading(true);
setResult("");
setError("");



try {


const res = await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:
`Create a detailed SEO strategy for:
${prompt}`

})

});



const data = await res.json();



if(!res.ok){

throw new Error(
data.error || "AI generation failed"
);

}



setResult(data.result);



const supabase = getSupabase();



const {
data:userData
}= await supabase.auth.getUser();



if(userData.user){


await supabase
.from("generations")
.insert({

user_id:userData.user.id,

type:"SEO",

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

SEO Generator 🚀

</h1>



<p className="
mt-3
text-gray-400
">

Create SEO strategies powered by AI

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
outline-none
"

placeholder="Enter website/topic"

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
disabled:opacity-50
"

>


{
loading
?
"Generating..."
:
"Generate SEO"
}


</button>




{
error && (

<p className="
mt-5
text-red-400
">

{error}

</p>

)

}




{
result && (

<div className="
mt-8
p-6
bg-white/10
border
border-white/10
rounded-xl
whitespace-pre-line
">


<h2 className="
text-xl
font-bold
mb-4
">

SEO Result

</h2>


{result}


</div>

)

}




</div>

)

}