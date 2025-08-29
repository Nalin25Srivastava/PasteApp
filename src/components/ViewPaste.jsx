import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormatDate } from "../utlis/formatDate";

const ViewPaste = () => {
  const { id } = useParams(); // ✅ get pasteId from URL
  const pastes = useSelector((state) => state.paste.pastes);

  // ✅ Find paste by _id
  const paste = pastes.find((p) => String(p._id) === String(id));

  if (!paste) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">Paste not found ❌</p>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto py-10 px-5 ">
      <h1 className="text-4xl font-bold mb-4">{paste.title}</h1>
      <p className="text-lg whitespace-pre-wrap ">{paste.content}</p>
      <div className="mt-4">
        <strong>Created At: </strong>
        {FormatDate(paste.createdAt)}
      </div>
    </div>
  );
};

export default ViewPaste;
