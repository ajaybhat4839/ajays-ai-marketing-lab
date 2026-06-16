"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";

export default function Dashboard() {

const [message,setMessage] = useState("");
const [reply,setReply] = useState("");
const [loading,setLoading] = useState(false);


async function sendMessage(){

if(!message) return;

setLoading(true);

const res = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message
})
});


const data = await res.json();

setReply(data.reply);

setLoading(false);

}


return (

<div className="
min-h-screen
bg-black
text-white
p-8
">


<h1 className="
text-4xl
font-bold
">

AI Growth Command Center

</h1>


<div className="
mt-10
max-w-4xl
rounded-3xl
border
border-white/10
bg-white/5
p-8
backdrop-blur-xl
">


<div className="flex gap-3 items-center">

<Bot/>

<h2 className="text-xl">
Ajay's AI Marketing Assistant
</h2>

</div>



<div className="
mt-8
min-h-[250px]
rounded-xl
bg-black/40
p-5
">


{
loading
?
<p>AI is thinking...</p>
:
<p className="text-gray-300">
{reply || "Ask me anything about SEO, Ads, Content or Growth 🚀"}
</p>
}


</div>




<div className="
mt-6
flex
gap-3
">


<input

value={message}

onChange={(e)=>setMessage(e.target.value)}

placeholder="Analyze my marketing strategy..."

className="
flex-1
rounded-xl
bg-white/10
p-4
outline-none
"

/>



<button

onClick={sendMessage}

className="
rounded-xl
bg-white/20
px-6
"

>

<Send/>

</button>


</div>



</div>


</div>

)

}