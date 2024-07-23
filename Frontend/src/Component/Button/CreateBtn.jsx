import { useState } from "react";
import useAuth from "../../../src/hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import DocumentService from "../../Service/DocService.jsx";
import  PlusIcon from "../../assets/PlusIcon.svg";
import Spinner from "../Spinner/Spinner.jsx";
import Toast from "../Toast/Toast.jsx";

const CreateDocumentButton = () => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDocumentCreateBtnClick = async () => {
    // if (accessToken === null) return;

    setLoading(true);

    try {
      console.log("Creating a new document");
      const response = await DocumentService.create(accessToken);
      const { id } = response.data.data;
      console.log(response.data.data._id);
      console.log("Document created successfully");
      navigate(`/document/${id}`);
    } catch (err) {
      Toast({error:true,message:"Unable to create a new document. Please try again"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-80 bg-gray-100 flex justify-center items-center font-medium text-gray-700 px-4 overflow-hidden">
      <div className="w-full h-full max-w-4xl py-4 space-y-4 overflow-auto">
        <h1>Start a new document</h1>
        <div className="flex items-center">
          <div className="space-y-2">
            <button
              disabled={loading}
              onClick={handleDocumentCreateBtnClick}
              className="h-52 w-40 bg-white border hover:border-blue-500 flex items-center justify-center"
            >
              <span className={`${loading && "opacity-0"}`}>
                <img src={PlusIcon} alt="plus" className="w-16 h-16 text-red-500" />
              </span>
              {loading && <Spinner size="md" />}
            </button>
            <h3 className="text-sm">Blank</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocumentButton;
