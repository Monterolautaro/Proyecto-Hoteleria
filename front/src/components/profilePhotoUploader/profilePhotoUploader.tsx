import React, { useState } from 'react';
import axios from 'axios';

interface ProfilePhotoUploaderProps {
    uploadEndpoint: string; 
    currentPhoto: string;  
  }

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({ uploadEndpoint, currentPhoto }) => {
  const [file, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentPhoto);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Crear previsualización
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona una imagen.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        
      const response = await axios.post(uploadEndpoint, formData);

      // Actualiza la imagen al nuevo URL devuelto por el backend
      setPreview(response.data.imageUrl);
      alert('¡Imagen subida con éxito!');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Actualizar Foto de Perfil</h2>
      <div>
        <img
          src={preview}
          alt="Foto de perfil"
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1em',
          }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: '1em' }}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '0.5em 1em',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {uploading ? 'Subiendo...' : 'Subir Foto'}
      </button>
    </div>
  );
};

export default ProfilePhotoUploader;
