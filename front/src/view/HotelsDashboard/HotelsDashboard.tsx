'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Hotel {
  hotel_id: string;
  name: string;
  availability: string;
  rooms: number;
  location: string;
}

const HotelsDashboard = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: '',
    availability: '',
    rooms: 0,
    location: '',
  });
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Obtener hoteles del backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_URL}/hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleCreateHotel = async () => {
    try {
      const response = await axios.post(`${API_URL}/hotels`, newHotel);
      setHotels([...hotels, response.data]);
      setIsModalOpen(false);
      setNewHotel({ name: '', availability: '', rooms: 0, location: '' });
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };

  const handleEditHotel = async () => {
    if (!selectedHotel) return;

    try {
      const response = await axios.put(`${API_URL}/hotels/${selectedHotel.hotel_id}`, selectedHotel);
      setHotels(
        hotels.map((hotel) =>
          hotel.hotel_id === selectedHotel.hotel_id ? response.data : hotel
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  const handleDeleteHotel = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel.hotel_id!== id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const openEditModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Management</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#009375] hover:bg-[#00352A] text-white px-4 py-2 rounded shadow"
        >
          Create Hotel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Availability</th>
              <th className="py-2 px-4 border-b text-center"># Rooms</th>
              <th className="py-2 px-4 border-b text-center">Location</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel.hotel_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{hotel.name}</td>
                  <td className="py-2 px-4 border-b">{hotel.availability}</td>
                  <td className="py-2 px-4 border-b text-center">{hotel.rooms}</td>
                  <td className="py-2 px-4 border-b">{hotel.location}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => openEditModal(hotel)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHotel(hotel.hotel_id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-2 px-4 border-b text-center">
                  No hotels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear hotel */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Create Hotel</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                value={newHotel.name}
                onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Availability</label>
              <input
                type="text"
                value={newHotel.availability}
                onChange={(e) => setNewHotel({ ...newHotel, availability: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2"># Rooms</label>
              <input
                type="number"
                value={newHotel.rooms}
                onChange={(e) => setNewHotel({ ...newHotel, rooms: Number(e.target.value) })}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                value={newHotel.location}
                onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateHotel}
                className="bg-[#FAB432] text-white py-2 px-4 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar hotel */}
      {isEditModalOpen && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Hotel</h2>
            <input
              type="text"
              value={selectedHotel.name}
              onChange={(e) =>
                setSelectedHotel({ ...selectedHotel, name: e.target.value })
              }
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              value={selectedHotel.availability}
              onChange={(e) =>
                setSelectedHotel({ ...selectedHotel, availability: e.target.value })
              }
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="number"
              value={selectedHotel.rooms}
              onChange={(e) =>
                setSelectedHotel({ ...selectedHotel, rooms: Number(e.target.value) })
              }
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              value={selectedHotel.location}
              onChange={(e) =>
                setSelectedHotel({ ...selectedHotel, location: e.target.value })
              }
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeEditModal}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditHotel}
                className="bg-[#FAB432] text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsDashboard;
