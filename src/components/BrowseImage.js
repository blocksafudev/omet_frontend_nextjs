import React, { useEffect, useState } from "react";
import { RiImageLine } from "react-icons/ri";

export const BrowseImage = ({
  onChange = (val) => {},
  isLoading = false,
  isError = false,
}) => {
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setPreviewImage("");
  }, [isError]);

  const handleFileBrowse = (e) => {
    const allowedType = ["image/jpeg", "image/png"];
    const { name, value } = e.target;
    const file = e.target.files[0];
    if (!allowedType.includes(file.type)) alert("Invalid File Type");
    else {
      setPreviewImage(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <label className="flex flex-col justify-center w-full rounded-lg items-center h-48 border border-gray-400 bg-blackn-50 hover:bg-gray-100 hover:border-gray-300">
      <div className="flex flex-col items-center justify-center pt-7">
        {isLoading && <img src={"./images/spinner.svg"} width={50} />}
        {!isLoading && (
          <>
            {previewImage && (
              <img src={previewImage} style={{ width: 150, height: 75 }} />
            )}
            {!previewImage && (
              <div className="flex flex-col justify-center items-center">
                <RiImageLine className="w-12 h-12 text-gray-700 group-hover:text-gray-600" />
                <p className="pt-1 text-sm tracking-wider text-gray-700 group-hover:text-gray-600">
                  Choose Files
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <input
        type="file"
        name="documentCover"
        onChange={handleFileBrowse}
        className="opacity-0"
        accept="image/*"
      />
    </label>
  );
};
