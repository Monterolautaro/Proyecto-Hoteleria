export const uploadImages = async (files: File[], id: string, token: string): Promise<string> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Asegúrate de que esta variable de entorno esté configurada correctamente
  
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    // Interpolación del ID en la URL
    const response = await fetch(`${API_URL}/files/upload/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.ok) {
      return "Images uploaded successfully!";
    } else {
      const errorData = await response.json();
      console.error("Upload failed:", errorData);
      return "Failed to upload images.";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return "An error occurred while uploading images.";
  }
};
