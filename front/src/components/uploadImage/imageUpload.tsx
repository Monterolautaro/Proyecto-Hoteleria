// "use client";

// import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
// import Image from "next/image";
// import React, { useState } from "react";

// const ImageUpload = () => {
//   const { images, setImages, uploadHotelImages } = useHotelCreation();

//   const [uploadStatus, setUploadStatus] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false); // Estado para manejar visualización de drag

//   // Manejar selección desde el input de archivos
//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files ? Array.from(event.target.files) : [];
//     handleFiles(files);

//     // Limpia el valor del input para permitir subir los mismos archivos nuevamente
//     event.target.value = "";
//   };

//   // Manejar archivos arrastrados
//   const handleFiles = (files: File[]) => {
//     const validImages = files.filter((file) => file.type.startsWith("image/"));
//     setImages((prevImages) => [...prevImages, ...validImages]); // Garantiza el uso del estado más reciente
//   };

//   // Subir imágenes
//   const handleUpload = async () => {
//     const result = await uploadHotelImages();
//     setUploadStatus(result);
//   };

//   // Eliminar imagen
//   const handleDeleteImage = (index: number) => {
//     const updatedImages = images.filter((_, idx) => idx !== index);
//     setImages(updatedImages);
//   };

//   // Manejar eventos de Drag-and-Drop
//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//     const files = Array.from(event.dataTransfer.files);
//     handleFiles(files);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Upload Images</h1>

//       {/* Área de arrastre */}
//       <div
//         className={`border-2 border-dashed rounded-lg p-6 text-center transition relative ${
//           isDragging ? "border-green-500 bg-green-100" : "border-gray-300"
//         }`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         {/* Mensaje cuando no hay imágenes cargadas */}
//         {images.length === 0 && (
//           <div>
//             <p className="text-gray-600">
//               {isDragging
//                 ? "Drop your images here!"
//                 : "Drag and drop your images here"}
//             </p>
//             <p className="text-sm text-gray-500 mt-2">or</p>
//           </div>
//         )}

//         {/* Mostrar imágenes cargadas */}
//         {images.length > 0 && (
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-32"
//               >
//                 {/* Cruz para eliminar imagen */}
//                 <button
//                   className="absolute top-1 right-1 text-white bg-black rounded-full p-1"
//                   onClick={() => handleDeleteImage(index)}
//                 >
//                   ✖
//                 </button>

//                 {/* Imagen */}
//                 <Image
//                   src={URL.createObjectURL(image)}
//                   alt={image.name}
//                   className="object-contain w-full h-full"
//                   width={500} // Reemplaza con el tamaño deseado
//                   height={500} // Reemplaza con el tamaño deseado
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Input y botón select files */}
//         <div className="mt-4">
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFileSelect}
//             className="hidden"
//             id="fileInput"
//           />
//           <label
//             htmlFor="fileInput"
//             className="inline-block bg-blue-500 text-white text-sm px-3 py-2 rounded cursor-pointer hover:bg-blue-600"
//           >
//             Select Files
//           </label>
//         </div>
//       </div>

//       {/* Botón de subida */}
//       <button
//         onClick={handleUpload}
//         className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         Upload
//       </button>

//       {/* Estado de subida */}
//       {uploadStatus && <p className="mt-2 text-green-600">{uploadStatus}</p>}
//     </div>
//   );
// };

// export default ImageUpload;
