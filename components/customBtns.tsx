import {ArrowBackIosNew,ArrowForwardIos} from "@mui/icons-material";

function PrevPageButton(){
    return <span >
        <ArrowBackIosNew className="text-[#701a75]"/>
        <span className="text-2xl relative top-1 text-[#1d4ed8]">Previous</span>
    </span>
}

function NextPageButton(){
    return (<span className="ml-10">
        <span className="text-2xl relative top-1 text-[#1d4ed8]">Next</span>
        <ArrowForwardIos className="text-[#701a75]"/>
        </span>
    );
}
export {PrevPageButton,NextPageButton};