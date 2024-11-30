import { IAdminData } from "@/interfaces/users";
import Loader from "@/components/UserDashboard/LoaderData";

const AdminData: React.FC<IAdminData> = ({ name, lastname, birthdate, email, username }) => {
  return (
    <div className="p-2 px-4 w-[40%] flex flex-col gap-3">
      <div>
        <h2 className="font-semibold text-lg">Name</h2>
        {name !== undefined ? <p>{name}</p> : <Loader />}
      </div>
      <div>
        <h2 className="font-semibold text-lg">Last Name</h2>
        {lastname !== undefined ? <p>{lastname}</p> : <Loader />}
      </div>
      <div>
        <h2 className="font-semibold text-lg">Birthdate</h2>
        {birthdate !== undefined ? <p>{birthdate}</p> : <Loader />}
      </div>
      <div>
        <h2 className="font-semibold text-lg">Email</h2>
        {email !== undefined ? <p>{email}</p> : <Loader />}
      </div>
      <div>
        <h2 className="font-semibold text-lg">Username</h2>
        {username !== undefined ? <p>{username}</p> : <Loader />}
      </div>
    </div>
  );
};

export default AdminData;
