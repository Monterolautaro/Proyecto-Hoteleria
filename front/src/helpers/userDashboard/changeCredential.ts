import axios from "axios";
import Swal from "sweetalert2";
import { Toast } from "../toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const changeEmail = async (email: string, id: string, token: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/changeEmail/${id}`,
      {email: email},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      Toast.fire({
        title: response.data.message,
        icon: "success",
      });
      return true;
    }
  } catch (error: any) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
      confirmButtonColor: "#009375",
    });
  }
};

export const changeUsername = async (
  username: string,
  id: string,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/changeUsername/${id}`,
    {username: username},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      Toast.fire({
        title: response.data.message,
        icon: "success",
      });
      return true;
    }
  } catch (error: any) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
      confirmButtonColor: "#009375",
    });
  }
};

interface IPasswords {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async (
  passwords: IPasswords,
  id: string,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/changePassword/${id}`,
      { password: passwords.oldPassword, newPassword: passwords.newPassword }, //Objeto para el body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      Toast.fire({
        title: response.data.message,
        icon: "success",
      });
      return true;
    }
  } catch (error: any) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
      confirmButtonColor: "#009375",
    });
  }
};
