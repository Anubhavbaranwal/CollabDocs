import { useContext, useState } from "react";
import useRandomBackground from "../../hooks/useRandomBackground";
import useAuth from "../../hooks/useAuth";
import { DocumentContext } from "../../Context/Document";
import DocumentUserService from "../../Service/DocUser";
import Toast from "../Toast/Toast";

const SharedUsers = ({ documentUsers, setDocument }) => {
  const { backgroundColor } = useRandomBackground();
  const { accessToken, email } = useAuth();
  const [loading, setLoading] = useState(false);
  const { document } = useContext(DocumentContext);

  const removeDocumentUser = async (payload) => {
    if (!accessToken) return;

    setLoading(true);

    try {
      await DocumentUserService.delete( payload);

      setDocument({
        ...document,
        users: document?.users.filter(
          (documentUser) => documentUser.userId !== payload.userId
        ),
      });
    } catch {
     Toast  ({error:true,message:"Unable to remove user from document. Please try again."});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md">
        <div className="flex items-center space-x-2">
          <div
            className={`${backgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}
          >
            {email !== null && email[0]}
          </div>
          <p className="font-medium">{email !== null && email} (you)</p>
        </div>
        <p className="text-gray-500 italic">Owner</p>
      </div>
      {documentUsers?.map((documentUser) => {
        return (
          <div
            key={documentUser.user.email}
            className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`${backgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}
              >
                {documentUser.user.email[0]}
              </div>
              <p className="font-medium">{documentUser.user.email}</p>
            </div>
            <button
              onClick={() =>
                removeDocumentUser({
                  documentId: documentUser.documentId,
                  userId: documentUser.userId,
                })
              }
              disabled={loading}
              className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SharedUsers;
