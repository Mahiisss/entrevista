import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="w-full h-full" style={{
        position:"fixed",
        top:"30vh",
        left:"40vw",
    }}>
    <ReactLoading type="spin" color="blue" height={"20%"} width={"20%"} />
    </div>
  );
}
