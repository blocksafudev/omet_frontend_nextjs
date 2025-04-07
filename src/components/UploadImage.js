import axios from "axios";
import React, { useState } from "react";
import { BrowseImage } from "./BrowseImage";

export const UploadImage = ({ type, onChange = (val) => {} }) => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const doUploadImage = async (file) => {
    setIsError(false);
    setIsLoading(true);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("path", type);

    await axios
      .post(process.env.API_SAFU + "/bullnium/_/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ` + process.env.API_AUTHORIZATION,
        },
      })
      .then((res) => {
        onChange(res.data.result.file_url);
      })
      .catch((e) => {
        alert(e);
        setIsError(true);
      });
    setIsLoading(false);
  };

  return (
    <>
      <BrowseImage
        onChange={(value) => {
          doUploadImage(value);
        }}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};
