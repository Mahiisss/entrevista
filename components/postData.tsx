import { Typography } from "@mui/material"

export default function PostData(props:any){
    console.log()
    return <div className="mt-6">
        <Typography style={{
            fontFamily:"Courgette"
        }} variant="h4" className="text-[blue]">{props.title}</Typography>
        <p className="italic text-[#9ca3af]"> Posted by <span className="text-[#9333ea] text-3xl">{props.author}</span> on {(new Date(props.created_at)).toLocaleString()}</p>
        <p className="mt-2"><span className="text-[#34d399]">Question: </span><span style={{fontFamily:"Roboto-Condensed"}} className="text-[#9ca3af] text-2xl">{props.question}</span></p>
        <p className="mt-2"><span className="text-[#34d399]">Answer: </span><span style={{fontFamily:"Roboto-Condensed"}} className="text-[#9ca3af] text-2xl">{props.answer}</span></p>
        <hr className="mt-4 w-1/2"/>
    </div>
}