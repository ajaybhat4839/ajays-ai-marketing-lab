export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";


export async function POST(req:Request){

try{


const formData = await req.formData();

const file:any = formData.get("file");


const buffer = Buffer.from(
await file.arrayBuffer()
);



const parser = new PDFParse({
data: buffer
});


const result = await parser.getText();



return NextResponse.json({

text: result.text

});


}
catch(error){

console.log(error);


return NextResponse.json({

text:"PDF extraction failed"

});

}

}