/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toast } from "@/helpers/toast";

interface ProfilePhotoUploaderProps {
  uploadEndpoint: string;
  currentPhoto: string;
  token?: string;
  handleRefresh: () => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  uploadEndpoint,
  currentPhoto,
  handleRefresh,
}) => {
  const [file, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentPhoto);
  const [uploading, setUploading] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const handleClick = () => {
    setEditImage(true);
  };

  const handleCancel = () => {
    setEditImage(false);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Crear previsualización
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = Cookies.get("token");
      console.log('este es el token', token);
      
      const response = await axios.post(uploadEndpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    

      // Actualiza la imagen al nuevo URL devuelto por el backend
      setPreview(response.data.imageUrl);
      handleRefresh();
      Toast.fire({
        title: "Image uploaded succesfully",
        icon: "success",
      });
      setEditImage(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex-col flex items-center">
      <div>
        <img
          src={preview}
          alt="Profile picture"
          className="w-[80px] h-[80px] cursor-pointer"
          onClick={handleClick}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      {editImage && (
        <div className="absolute flex items-center rounded-lg shadow-xl p-2  bg-[#0006] top-0 left-[-180px] w-[180px] h-[180px]">
          <div className="flex flex-col gap-2 items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full min-w-full text-sm"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-[80%]"
              style={{
                backgroundColor: "#009375",
                color: "white",
                padding: "0.5em 1em",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {uploading ? "Subiendo..." : "Subir Foto"}
            </button>
            <button className="w-[70%] bg-red-400" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
