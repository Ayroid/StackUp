import "./Loading.css";

const Loading = () => {
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-[#2020208a]">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
