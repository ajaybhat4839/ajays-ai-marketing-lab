"use client";

import Link from "next/link";


export default function Home(){


return (

<div className="
min-h-screen
bg-black
text-white
p-10
">


<nav className="
flex
justify-between
items-center
">


<h1 className="
text-3xl
font-bold
">

Ajay's AI Lab 🚀

</h1>



<div className="space-x-4">


<Link href="/login">

<button className="
px-6
py-3
rounded-xl
bg-white
text-black
">

Login

</button>

</Link>



<Link href="/signup">

<button className="
px-6
py-3
rounded-xl
border
border-white/20
">

Signup

</button>

</Link>


</div>


</nav>





<section className="
mt-32
text-center
">


<h1 className="
text-6xl
font-bold
">

AI Powered
<br/>

Marketing Growth Engine

</h1>



<p className="
mt-6
text-xl
text-gray-400
">

Generate SEO, blogs, ads and marketing strategies using AI.

</p>




<Link href="/signup">


<button className="
mt-10
px-10
py-4
rounded-xl
bg-white
text-black
text-lg
">

Start Building 🚀

</button>


</Link>


</section>







<div className="
grid
md:grid-cols-3
gap-6
mt-32
">


<Card
title="SEO Intelligence"
text="Create strategies that improve rankings"
/>


<Card
title="AI Content"
text="Generate blogs and marketing copy"
/>


<Card
title="Ad Creator"
text="Build high converting campaigns"
/>



</div>



</div>

)

}





function Card({title,text}:any){

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