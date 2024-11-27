// "use client";

// import BasicInfoForm from "@/components/HotelBasicInfo/HotelBasicInfoForm";
// import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
// import HotelDetailsForm from "@/components/HotelDetailsForm/HotelDetailsForm";
// import RoomInfoForm from "@/components/HotelRoomsForm/HotelRoomsForm";
// import createHotel from "@/helpers/hotelCreation/createHotel";
// import { IHotelCreation } from "@/interfaces/hotelCreation";
// import { useEffect, useRef } from "react";

// const HotelCreationView = () => {
//   const {
//     hotelInfo,
//     hotelDetails,
//     hotelRooms,
//     step,
//     setStep,
//     setHotelInfo,
//     setHotelDetails,
//     setHotelRooms,
//   } = useHotelCreation();

//   const formStepThreeRef = useRef<HTMLDivElement>(null);

//   const handleNext = (): void => {
//     if (step < 3) {
//       setStep((prevStep) => prevStep + 1);
//     }
//   };

//   const handlePrevious = (): void => {
//     if (step > 1) {
//       setStep((prevStep) => prevStep - 1);
//     }
//   };

//   const handleSubmit = async (): Promise<void> => {
//     const newHotel: IHotelCreation = {
//       name: hotelInfo.name,
//       details: {
//         stars: parseInt(hotelDetails.stars, 10),
//         rating: parseFloat(hotelDetails.rating),
//         imgUrl: hotelDetails.img,
//         description: hotelDetails.description,
//       },
//       address: {
//         city: hotelInfo.city,
//         country: hotelInfo.country,
//         street: hotelInfo.address,
//       },
//       availability: {
//         available: true,
//         totalRoomsLeft: parseInt(hotelRooms.roomsLeft, 10),
//       },
//       rooms: {
//         single: {
//           price: parseFloat(hotelRooms.price),
//           currency: hotelRooms.currency,
//           rooms_left: parseInt(hotelRooms.roomsLeft, 10),
//           description: hotelRooms.description,
//         },
//         double: {
//           price: parseFloat(hotelRooms.price),
//           currency: hotelRooms.currency,
//           rooms_left: parseInt(hotelRooms.roomsLeft, 10),
//           description: hotelRooms.description,
//         },
//         triple: {
//           price: parseFloat(hotelRooms.price),
//           currency: hotelRooms.currency,
//           rooms_left: parseInt(hotelRooms.roomsLeft, 10),
//           description: hotelRooms.description,
//         },
//         suite: {
//           price: parseFloat(hotelRooms.price),
//           currency: hotelRooms.currency,
//           rooms_left: parseInt(hotelRooms.roomsLeft, 10),
//           description: hotelRooms.description,
//         },
//       },
//       amenities: {
//         pool: false,
//         spa: false,
//         gym: false,
//         restaurant: false,
//         bar: false,
//       },
//     };

//     console.log(newHotel);
//     await createHotel(newHotel);
//   };

//   // Scroll hacia el formulario de Step 3 cuando aparece
//   useEffect(() => {
//     if (step === 3 && formStepThreeRef.current) {
//       formStepThreeRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [step]);

//   return (
//     <div className="bg-[#00352A] min-h-screen p-6 text-white">
//       {/* Contenedor principal con texto y formularios */}
//       <div className="flex justify-center items-center">
//         <div className="flex items-center bg-[#00352A] min-h-screen text-white px-4">
//           <div className="w-full md:w-2/3 ml-32">
//             <h1 className="text-5xl font-bold text-white mb-2">Welcome to</h1>
//             <h1 className="text-5xl font-bold text-white mb-2">
//               <span className="text-[#00D1B2]">Hotel</span>
//             </h1>
//             <h1 className="text-5xl font-bold text-white mb-4">Registration</h1>
//             <p className="text-lg text-white leading-relaxed">
//               Please fill out the form below to register a new hotel. Provide
//               accurate details to ensure everything is set up correctly.
//             </p>
//           </div>
//         </div>

//         {/* Formulario principal para pasos 1 y 2 */}
//         {step !== 3 && (
//           <div className="w-full max-w-md bg-[#004D40] p-6 rounded-lg shadow-lg mr-14">
//             {step === 1 && (
//               <BasicInfoForm hotelInfo={hotelInfo} setHotelInfo={setHotelInfo} />
//             )}
//             {step === 2 && (
//               <HotelDetailsForm
//                 hotelDetails={hotelDetails}
//                 setHotelDetails={setHotelDetails}
//               />
//             )}

//             <div className="flex justify-between mt-4">
//               {/* Mostrar "Previous" solo si estamos en el paso 2 */}
//               {step > 1 && (
//                 <button
//                   onClick={handlePrevious}
//                   className="bg-gray-600 text-white px-4 py-2 rounded"
//                 >
//                   Previous
//                 </button>
//               )}
//               <button
//                 onClick={handleNext}
//                 className="bg-[#00B894] text-white px-4 py-2 rounded ml-auto"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Nuevo contenedor para el paso 3 */}
//       {step === 3 && (
//         <div
//           ref={formStepThreeRef}
//           className="w-full flex flex-col justify-center items-center bg-[#009375] min-h-screen"
//         >
//           <div className="w-full max-w-5xl bg-[#004C3F] p-8 rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-white mb-6">
//               Choose the rooms
//             </h2>
//             <RoomInfoForm
//               hotelRooms={hotelRooms}
//               setHotelRooms={setHotelRooms}
//             />
//           </div>

//           <div className="flex justify-between mt-4 w-full max-w-5xl">
//             <button
//               onClick={handlePrevious}
//               className="bg-gray-600 text-white px-4 py-2 rounded"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="bg-[#00B894] text-white px-4 py-2 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HotelCreationView;
