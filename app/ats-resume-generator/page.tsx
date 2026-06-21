"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function ATSResumeGenerator(){

const [resume,setResume]=useState("");
const [job,setJob]=useState("");
const [result,setResult]=useState("");
const [score,setScore]=useState("");
const [loading,setLoading]=useState(false);
const [mode,setMode]=useState("paste");



async function uploadPDF(e:any){

const file=e.target.files[0];

if(!file) return;


const form=new FormData();

form.append("file",file);


const res=await fetch("/api/pdf",{
method:"POST",
body:form
});


const data=await res.json();

setResume(data.text || "");

}




async function generateATS(){

if(!resume || !job){

alert("Add resume and job description");

return;

}


setLoading(true);


const res=await fetch("/api/ats",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
resume,
job
})

});


const data=await res.json();


setResult(data.result);


const match=data.result.match(
/ATS Score:\s*(\d+)/
);


if(match){
setScore(match[1]);
}


setLoading(false);

}




function downloadPDF(){

const pdf=new jsPDF();

pdf.text(result,10,10,{
maxWidth:180
});

pdf.save("ATS-Resume.pdf");

}



return (

<div className="min-h-screen bg-black text-white p-10">


<h1 className="text-4xl font-bold mb-8">
AI ATS Resume Generator
</h1>



<div className="flex gap-5 mb-6">


<button

onClick={()=>setMode("pdf")}

className="bg-blue-600 px-6 py-3 rounded"

>
📄 Upload PDF
</button>



<button

onClick={()=>setMode("paste")}

className="bg-purple-600 px-6 py-3 rounded"

>
✍️ Paste Resume
</button>


</div>





{mode==="pdf" && (

<div>

<label className="bg-green-600 px-6 py-3 rounded cursor-pointer">


Choose Resume PDF


<input

type="file"

accept=".pdf"

className="hidden"

onChange={uploadPDF}

/>


</label>


</div>

)}





{mode==="paste" && (

<textarea

className="w-full mt-5 p-4 bg-white text-black rounded"

rows={10}

placeholder="Paste your resume here"

value={resume}

onChange={(e)=>setResume(e.target.value)}

/>

)}




<textarea

className="w-full mt-5 p-4 bg-white text-black rounded"

rows={7}

placeholder="Paste job description here"

value={job}

onChange={(e)=>setJob(e.target.value)}

/>





<button

onClick={generateATS}

className="bg-blue-600 px-10 py-3 mt-5 rounded"

>

{loading ? "Analyzing..." : "Generate ATS"}

</button>





{score && (

<div className="mt-8 text-3xl">

ATS Score:

<span className="text-green-400">
 {score}/100
</span>

</div>

)}





<pre className="mt-8 bg-zinc-900 p-5 rounded whitespace-pre-wrap">

{result}

</pre>





{result && (

<button

onClick={downloadPDF}

className="bg-orange-600 px-8 py-3 mt-5 rounded"

>

Download ATS PDF

</button>

)}



</div>

)

}