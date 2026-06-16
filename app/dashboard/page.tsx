"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  BarChart3,
  Search,
  Target,
  Rocket
} from "lucide-react";


export default function Home(){


return (

<div className="
min-h-screen
bg-black
text-white
overflow-hidden
">


{/* Background */}

<div className="
absolute
inset-0
bg-gradient-to-br
from-purple-900/30
via-black
to-blue-900/30
"/>



<div className="
relative
z-10
p-8
">


<nav className="
flex
justify-between
items-center
">


<h1 className="
text-2xl
font-bold
">

AJAY'S AI MARKETING LAB

</h1>


<Link
href="/dashboard"
className="
px-6
py-3
rounded-full
bg-white
text-black
font-semibold
">

Launch AI

</Link>


</nav>



<section className="
mt-32
max-w-5xl
">

<motion.h1

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
text-6xl
font-bold
leading-tight
"

>

Your Personal AI
<br/>

Digital Marketing
<br/>

Command Center 🚀

</motion.h1>



<p className="
mt-8
text-xl
text-gray-400
max-w-2xl
">

SEO intelligence, Ads analysis,
content strategy and growth recommendations
powered by AI.

</p>



<Link

href="/dashboard"

className="
inline-flex
mt-10
gap-3
items-center
px-8
py-4
rounded-full
bg-white/10
border
border-white/20
hover:bg-white/20
"

>

<Rocket/>

Start Growing

</Link>


</section>




<div className="
grid
md:grid-cols-4
gap-5
mt-24
">


<Card icon={<Search/>} text="SEO Intelligence"/>

<Card icon={<BarChart3/>} text="Ads Analytics"/>

<Card icon={<Target/>} text="Campaign Strategy"/>

<Card icon={<Sparkles/>} text="AI Growth"/>


</div>


</div>


</div>

)

}




function Card({
icon,
text
}:{
icon:any,
text:string
}){


return (

<div className="
rounded-3xl
bg-white/5
border
border-white/10
p-8
backdrop-blur-xl
">


{icon}

<h3 className="mt-5 text-xl">
{text}
</h3>


</div>

)

}