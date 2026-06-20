"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";


export default function Ads(){


const [prompt,setPrompt]=useState("");
const [output,setOutput]=useState("");
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");



async function generate(){


if(!prompt.trim()){

setError("Please enter product/business");

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
`Create high converting advertisement copy for:
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



const {
data:userData
}=await supabase.auth.getUser();



if(userData.user){


await supabase
.from("generations")
.insert({

user_id:userData.user.id,

type:"Ads",

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

Ads Creator 🎯

</h1>


<p className="text-gray-400 mt-3">

Create high converting ad campaigns

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

placeholder="Enter product or business"

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
"Creating..."
:
"Generate Ads"
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
output && (

<div className="
mt-8
p-6
bg-white/10
rounded-xl
whitespace-pre-line
">


<h2 className="
text-xl
font-bold
mb-4
">

Ad Copy

</h2>


{output}


</div>

)

}




</div>

)

}