export async function askAI(prompt:string){


// =====================
// 1) TRY GROQ FIRST
// =====================

try{

const groq = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${process.env.GROQ_API_KEY}`
},

body:JSON.stringify({

model:"llama-3.3-70b-versatile",

messages:[
{
role:"system",
content:"You are a helpful AI assistant."
},
{
role:"user",
content:prompt
}
]

})

});


const data = await groq.json();

console.log("GROQ RESPONSE:",data);


if(data.choices?.[0]?.message?.content){

return data.choices[0].message.content;

}


}

catch(error){

console.log("GROQ FAILED:",error);

}



// =====================
// 2) TRY GEMINI SECOND
// =====================

try{


const gemini = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[
{
parts:[
{
text:prompt
}
]
}
]

})

}

);



const data = await gemini.json();


console.log("GEMINI RESPONSE:",data);



if(
data.candidates?.[0]?.content?.parts?.[0]?.text
){

return data.candidates[0].content.parts[0].text;

}


}


catch(error){

console.log("GEMINI FAILED:",error);

}




// =====================
// 3) TRY OPENAI LAST
// =====================


try{


const openai = await fetch(

"https://api.openai.com/v1/chat/completions",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:
`Bearer ${process.env.OPENAI_API_KEY}`

},

body:JSON.stringify({

model:"gpt-4.1-mini",

messages:[

{
role:"system",
content:"You are a helpful AI assistant."
},

{
role:"user",
content:prompt
}

]

})

}

);



const data = await openai.json();


console.log("OPENAI RESPONSE:",data);



if(
data.choices?.[0]?.message?.content
){

return data.choices[0].message.content;

}


}


catch(error){

console.log("OPENAI FAILED:",error);

}



// =====================
// ALL FAILED
// =====================

return "All AI providers failed. Check API keys/quota.";

}