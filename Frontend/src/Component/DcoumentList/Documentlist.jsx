import DocumentCard from "../DocumentCard/DocumentCard";

const DocumentsList = ({
  title,
  documents,
  setDocuments,
}) => {
  return (
    <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h2>{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {documents?.length > 0 &&
            documents.sort((a, b) => {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            })
            .map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                setDocuments={setDocuments}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
