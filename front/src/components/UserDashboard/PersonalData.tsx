import { IUserData } from "@/interfaces/users";

const PersonalData: React.FC<IUserData> = ({ name, lastname, birthdate }) => {
  return (
    <div className="p-2 px-4 w-[50%] flex flex-col gap-3">
      <div>
        <h2 className="font-semibold text-lg">Name</h2>
        <p>{name}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Last Name</h2>
        <p>{lastname}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Birthdate</h2>
        <p>{birthdate.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PersonalData;
