// helpers/imageUpload.ts
export const uploadImages = async (files: File[]): Promise<string> => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
  
    try {
      const response = await fetch(`${API_URL}files/upload/:id`, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        return "Images uploaded successfully!";
      } else {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        return "Failed to upload images.";
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      return "Error uploading images.";
    }
  };
  