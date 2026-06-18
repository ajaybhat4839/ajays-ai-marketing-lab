"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
Home,
Search,
PenTool,
Mail,
Target,
MessageSquare
} from "lucide-react";

import Link from "next/link";


export default function Dashboard(){

const router=useRouter();

const [history,setHistory]=useState<any[]>([]);



useEffect(()=>{


async function load(){


const {
data
}=await supabase.auth.getSession();



if(!data.session){

router.push("/login");
return;

}



const {data:items}=await supabase

.from("generations")

.select("*")

.eq(
"user_id",
data.session.user.id
)

.order(
"created_at",
{
ascending:false
}
)

.limit(5);



setHistory(items || []);



}


load();


},[router]);





async function logout(){

await supabase.auth.signOut();

router.push("/login");

}





return (

<div className="
min-h-screen
bg-black
text-white
flex
">


<aside className="
w-64
border-r
border-white/10
p-6
hidden
md:block
">


<h1 className="
text-3xl
font-bold
mb-10
">

Ajay's AI Lab

</h1>


<nav className="space-y-4">


<Menu icon={<Home/>} name="Dashboard" link="/dashboard"/>

<Menu icon={<Search/>} name="SEO Generator" link="/dashboard/seo"/>

<Menu icon={<PenTool/>} name="Blog Writer" link="/dashboard/blog"/>

<Menu icon={<Mail/>} name="Email Writer" link="/dashboard/email"/>

<Menu icon={<Target/>} name="Ads Creator" link="/dashboard/ads"/>


</nav>


</aside>





<main className="
flex-1
p-10
">


<div className="
flex
justify-between
">


<h1 className="
text-5xl
font-bold
">

Welcome 👋

</h1>



<button

onClick={logout}

className="
bg-red-500
px-5
py-3
rounded-xl
"

>

Logout

</button>


</div>





<div className="
mt-12
p-6
rounded-3xl
bg-white/5
border
border-white/10
">


<h2 className="
text-2xl
font-bold
">

Recent AI Generations

</h2>



{
history.length===0 ?

<p className="text-gray-400 mt-4">
No generations yet
</p>


:

history.map(item=>(

<div

key={item.id}

className="
mt-4
p-4
bg-black
rounded-xl
"

>


<h3 className="font-bold">

{item.type}

</h3>


<p className="text-gray-400">

{item.prompt}

</p>


</div>


))

}



</div>




</main>


</div>

)

}





function Menu({icon,name,link}:any){

return (

<Link href={link}>

<div className="
flex
gap-3
p-3
rounded-xl
hover:bg-white/10
">

{icon}

{name}

</div>

</Link>

)

}
