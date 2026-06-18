"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Blog(){


const [prompt,setPrompt]=useState("");
const [output,setOutput]=useState("");
const [loading,setLoading]=useState(false);



async function generate(){


setLoading(true);
setOutput("");



const res = await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:
`Write a detailed SEO friendly blog article about:
${prompt}`

})

});



const data=await res.json();



setOutput(
data.result || data.error
);



const {
data:userData
}=await supabase.auth.getUser();



if(userData.user && data.result){


await supabase
.from("generations")
.insert({

user_id:userData.user.id,

type:"Blog",

prompt,

result:data.result

});


}



setLoading(false);


}




return (

<div className="min-h-screen bg-black text-white p-10">


<h1 className="text-4xl font-bold">
Blog Writer ✍️
</h1>


<textarea

className="
mt-8
w-full
p-4
rounded-xl
bg-white/10
"

placeholder="Enter blog topic"

value={prompt}

onChange={(e)=>setPrompt(e.target.value)}

/>


<button

onClick={generate}

className="
mt-5
px-8
py-3
bg-white
text-black
rounded-xl
"

>

{loading?"Writing...":"Generate Blog"}

</button>


<pre className="
mt-8
whitespace-pre-wrap
">

{output}

</pre>


</div>

)

}