import { ChangeEvent, FocusEvent, useContext, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { DocumentContext } from "../../Context/Document";
import DocumentService from "../../Service/DocService";
import UserDropDown from "../UserDropDown/UserDropDown";
import useRandomBackground from "../../hooks/useRandomBackground";
import ShareDocumentModal from "../Model/ShareDocModel";
import Logo from "../logo/Logo";

const CurrentUsers = () => {
  const { email } = useAuth();
  const { currentUsers } = useContext(DocumentContext);
  const { backgroundColor } = useRandomBackground();

  return (
    <>
      {Array.from(currentUsers)
        .filter((currentUser) => currentUser !== email)
        .map((currentUser) => {
          return (
            <div
              key={currentUser}
              className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2`}
            >
              {currentUser[0]}
            </div>
          );
        })}
    </>
  );
};

const DocumentMenuBar = () => {
  const { accessToken, userId } = useAuth();
  console.log(userId);
  const {
    document,
    saving,
    setDocumentTitle,
    setDocument,
    setSaving,
    setErrors,
  } = useContext(DocumentContext);

  const handleTitleInputChange = (event) => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event) => {
    if (accessToken === null || document === null) return;

    setSaving(true);

    const title = event.target.value;
    const updatedDocument = {
      ...document,
      title,
    };

    try {
     const update= await DocumentService.update(document.id, updatedDocument);
     console.log(update);
    } catch (error) {
      setErrors(["There was an error saving the document. Please try again."]);
    } finally {
      setDocument(updatedDocument);
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b">
      <div className="w-full flex justify-start items-center overflow-x-hidden md:overflow-visible">
        {/* <Logo /> */}
        <Logo/>
        <div className="flex flex-col">
          <input
            maxLength={25}
            type="text"
            onBlur={handleTitleInputBlur}
            onChange={handleTitleInputChange}
            value={document?.title ? document?.title : ""}
            className="font-medium text-lg px-2 pt-2"
            placeholder="Untitled Document"
          />
          <div className="flex items-center">
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              File
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Edit
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              View
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Insert
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Format
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Tools
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Add-ons
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Help
            </button>
            {saving && <p className="text-sm text-gray-500 px-2">Saving...</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center flex-shrink-0 pl-3 gap-x-4">
        {document !== null && document.userId === userId && (
          <ShareDocumentModal />
        )}
        <div className="flex items-center gap-x-2">
          <CurrentUsers />
          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

export default DocumentMenuBar;
