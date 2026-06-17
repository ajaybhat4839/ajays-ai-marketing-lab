"use client";

import Link from "next/link";
import {
  Search,
  Mail,
  PenTool,
  Target,
  MessageSquare,
  BarChart3
} from "lucide-react";


export default function Dashboard(){

return (

<div className="min-h-screen bg-black text-white p-10">

<h1 className="text-5xl font-bold">
AI Marketing Command Center 🚀
</h1>

<p className="mt-4 text-gray-400">
Create, optimize and scale your marketing with AI.
</p>


<div className="
grid
md:grid-cols-3
gap-6
mt-12
">


<Card
title="SEO Generator"
icon={<Search/>}
link="/dashboard/seo"
/>


<Card
title="Blog Writer"
icon={<PenTool/>}
link="/dashboard/blog"
/>


<Card
title="Email Writer"
icon={<Mail/>}
link="/dashboard/email"
/>


<Card
title="Ads Creator"
icon={<Target/>}
link="/dashboard/ads"
/>


<Card
title="AI Marketing Chat"
icon={<MessageSquare/>}
link="/chat"
/>


<Card
title="Analytics"
icon={<BarChart3/>}
link="#"
/>


</div>

</div>

)

}



function Card({
title,
icon,
link
}:any){


return (

<Link href={link}>

<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
hover:bg-white/10
transition
cursor-pointer
">


<div className="text-3xl">
{icon}
</div>


<h2 className="mt-5 text-xl font-bold">
{title}
</h2>


<p className="mt-2 text-gray-400">
Launch tool →
</p>


</div>

</Link>

)

}