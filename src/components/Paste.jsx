import { Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPaste } from "../slices/PasteSlice";
import { FormatDate } from "../utlis/formatDate";
import { useNavigate, Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(removeFromPaste(id));
    toast.error("Paste deleted successfully ❌");
  };

  const handleAdd = () => {
    navigate("/"); // redirect to home page (create new paste page)
    toast.success("Redirecting to create a new paste ✍️");
  };

  // ✅ Filter by title or content
  const filteredPastes = pastes.filter(
    (paste) =>
      paste?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste?.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Latest paste on top
  const sortedPastes = [...filteredPastes].reverse();

  return (
    <div className="w-150 h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Paste Button */}
        <Link
          onClick={handleAdd}
          className="border px-4 py-2 rounded text-white w-fit"
        >
          Add Paste
        </Link>

        {/* All Pastes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>

          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {sortedPastes.length > 0 ? (
              sortedPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="w-full gap-y-4 justify-between flex flex-col sm:flex-row"
                >
                  {/* Title & Content */}
                  <div className="flex flex-col">
                    <p className="text-4xl font-semibold">{paste?.title}</p>
                    <p className="text-xl font-normal line-clamp-3 max-w-[100%]">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      {/* Edit */}
                      <Link
                        to={`/?pasteId=${paste?._id}`}
                       
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent hover:border-blue-500 group"
                      >
                        <PencilLine
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        />
                      </Link>

                      <Link
                        to="#"
                        onClick={() => handleDelete(paste?._id)}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] 
                          hover:bg-transparent hover:border-pink-500 group"
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </Link>

                      {/* View */}
                      <Link
                        to={`/paste/${paste._id}`}
                        onClick={() => toast("Viewing paste 👀")}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent hover:border-orange-500 group"
                      >
                        <Eye
                          className="text-black group-hover:text-orange-500"
                          size={20}
                        />
                      </Link>

                      {/* Copy */}
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault(); // prevent unwanted navigation
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard ✅");
                        }}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent hover:border-green-500 group"
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </Link>
                    </div>

                    {/* Date */}
                    <div className="gap-x-2 flex items-center">
                      <span>{FormatDate(paste?.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
