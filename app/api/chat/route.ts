import { NextResponse } from "next/server";


export async function POST(req: Request) {

try {

const { message } = await req.json();


let reply = "";


const text = message.toLowerCase();



if(text.includes("seo")){

reply =
`
🚀 SEO Analysis Report

• Keyword Research:
Find high-intent keywords related to your niche.

• Technical SEO:
Improve page speed, mobile experience and indexing.

• Content Strategy:
Create topic clusters and authority content.

• Backlinks:
Build quality references from relevant websites.

Growth Score: 82/100
`;

}


else if(
text.includes("ads") ||
text.includes("facebook") ||
text.includes("google")
){

reply =
`
📊 Ads Intelligence Report

Campaign Analysis:

✓ Target audience research
✓ Creative testing required
✓ Track CTR and conversion rate
✓ Improve ROAS with retargeting

Recommended:
Run 3 creative variations and compare results.

Campaign Score: 88/100
`;

}


else if(text.includes("content")){

reply =
`
✍️ Content Strategy

Create:

1. Educational posts
2. Case studies
3. Short videos
4. Customer stories

Use:
Hook → Value → CTA framework.
`;

}


else {


reply =
`
🤖 Ajay's AI Marketing Lab

I analyzed your request:

"${message}"

My recommendation:

• Improve SEO foundation
• Test paid campaigns
• Create consistent content
• Track analytics weekly

Growth opportunity detected 🚀
`;

}



return NextResponse.json({
reply
});


}

catch(error){


return NextResponse.json(
{
error:"Demo AI error"
},
{
status:500
}
);


}

}