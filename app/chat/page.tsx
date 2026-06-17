"use client";

import { useState } from "react";


export default function ChatPage(){

const [message,setMessage] = useState("");
const [reply,setReply] = useState("");
const [loading,setLoading] = useState(false);



async function sendMessage(){

if(!message) return;


setLoading(true);
setReply("");



const res = await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:`
You are Ajay's AI Marketing Assistant.

Answer this marketing question:

${message}

`

})

});



const data = await res.json();

setReply(data.result);

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
text-5xl
font-bold
">

AI Marketing Assistant 🤖

</h1>


<p className="
mt-3
text-gray-400
">

Ask anything about SEO, Ads, Content or Growth.

</p>




<div className="
mt-10
max-w-4xl
">


<textarea

value={message}

onChange={(e)=>setMessage(e.target.value)}

placeholder="
Example:
Create a Facebook ads strategy for my business
"

className="
w-full
h-40
p-5
rounded-2xl
bg-white/10
border
border-white/20
"


/>



<button

onClick={sendMessage}

className="
mt-5
px-8
py-4
rounded-xl
bg-white
text-black
font-bold
"

>

Generate

</button>



{loading && (

<p className="mt-6 text-blue-400">

AI is thinking...

</p>

)}




{reply && (

<div className="
mt-8
p-6
rounded-2xl
bg-white/5
border
border-white/10
">


<pre className="
whitespace-pre-wrap
">

{reply}

</pre>


</div>

)}


</div>


</div>

)


}