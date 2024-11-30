import { IUserData } from "@/interfaces/users";
import Loader from "./LoaderData";

const PersonalData: React.FC<IUserData> = ({ name, lastname, birthdate }) => {
  return (
    <div className="p-2 px-4 w-[50%] flex flex-col gap-3">
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
    </div>
  );
};

export default PersonalData;
