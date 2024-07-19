import ErrorIcon from "../../assets/browser.png";
import SuccessIcon from "../../assets/check.png";

const Toast = ({
  success = false,
  error = false,
  message = "",
  title = "",
}) => {
  return (
    <div className="w-[536px] p-4 rounded-lg shadow-md bg-white flex sm:w-[350px]">
      <div className={`flex items-center justify-center w-[80px] h-[75px] ml-6 p-7 rounded-lg ${success ? "bg-[#25ae88]" : "bg-[#db2828]"}`}>
        {error && <img src={ErrorIcon} alt="error" className="w-[30px] h-[30px]" />}
        {success && <img src={SuccessIcon} alt="success" className="w-[30px] h-[30px]" />}
      </div>
      <div className="flex flex-col text-right">
        <h1 className="font-bold text-[1.8rem] leading-[1.5] text-[rgba(0,0,0,0.87)]">{title}</h1>
        <p className="mt-1 font-normal text-[1.6rem] leading-[1.5] text-[rgba(0,0,0,0.8)]">{message}</p>
        
      </div>
    </div>
  );
};

export default Toast;
