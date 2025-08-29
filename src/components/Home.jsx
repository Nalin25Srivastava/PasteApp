import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updatePaste } from "../slices/PasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchparams, setSearchparams] = useSearchParams();
  const pasteId = searchparams.get("pasteId");
  const allpastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id.toString() === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
        
      } else {
        toast.error("Paste not found ❌");
      }
    }
  }, [pasteId, allpastes]);

  const createPaste = () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty ⚠️");
      return;
    }
    if (!value.trim()) {
      toast.error("Content cannot be empty ⚠️");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
      updatedAt: pasteId ? new Date().toISOString() : null,
    };

    if (pasteId) {
      // update
      dispatch(updatePaste(paste));
      toast.success("Paste updated successfully ✅");
    } else {
      // create
      dispatch(addToPaste(paste));
      toast.success("Paste created successfully 🎉");
    }

    // after creation / updation
    setTitle("");
    setValue("");
    setSearchparams({});
  };

  return (
    <>
      <div>
        <div className="flex flex-row gap-5">
          <input
            className="p-2 rounded-2xl mt-2 border-2 w-48"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title Here"
            value={title}
          />
          <button
            onClick={createPaste}
            className="p-2 rounded-2xl mt-2 border-2 w-48"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
        <div className="mt-6">
          <textarea
            className="p-2 rounded-2xl mt-2 border-2 w-48 min-w-[400px]"
            value={value}
            placeholder="Enter Text Here"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
