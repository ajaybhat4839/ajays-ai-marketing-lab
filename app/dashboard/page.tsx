"use client";

import Link from "next/link";
import {
  Search,
  Mail,
  PenTool,
  Target,
  MessageSquare,
  BarChart3,
  Home
} from "lucide-react";


export default function Dashboard(){


return (

<div className="min-h-screen bg-black text-white flex">


{/* Sidebar */}

<aside className="
w-64
border-r
border-white/10
p-6
hidden
md:block
">


<h1 className="
text-5xl
font-bold
">

Welcome to Ajay's AI Lab

</h1>


<nav className="space-y-4">


<Menu
icon={<Home/>}
name="Dashboard"
link="/dashboard"
/>


<Menu
icon={<Search/>}
name="SEO Generator"
link="/dashboard/seo"
/>


<Menu
icon={<PenTool/>}
name="Blog Writer"
link="/dashboard/blog"
/>


<Menu
icon={<Mail/>}
name="Email Writer"
link="/dashboard/email"
/>


<Menu
icon={<Target/>}
name="Ads Creator"
link="/dashboard/ads"
/>


<Menu
icon={<MessageSquare/>}
name="AI Chat"
link="/chat"
/>


</nav>


</aside>




{/* Main */}

<main className="
flex-1
p-10
">


<h1 className="
text-5xl
font-bold
">

Welcome to Ajay's AI Lab 

</h1>


<p className="
mt-4
text-gray-400
">

Your AI powered digital marketing workspace.

</p>




<div className="
grid
md:grid-cols-3
gap-6
mt-12
">



<Card
title="SEO Intelligence"
text="Rank higher on Google"
/>


<Card
title="Content Creation"
text="Generate blogs instantly"
/>


<Card
title="Marketing Strategy"
text="Build campaigns faster"
/>



</div>


</main>


</div>

)

}




function Menu({
icon,
name,
link
}:any){


return (

<Link href={link}>

<div className="
flex
gap-3
items-center
p-3
rounded-xl
hover:bg-white/10
cursor-pointer
">

{icon}

{name}

</div>

</Link>

)

}




function Card({
title,
text
}:any){


return (

<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
">


<h2 className="
text-2xl
font-bold
">

{title}

</h2>


<p className="
mt-3
text-gray-400
">

{text}

</p>


</div>

)

}