import { IUserCredentials } from "@/interfaces/users";

const Credentials: React.FC<IUserCredentials> = ({ email, username }) => {
  return (
    <div className="w-[50%] p-2 px-4 flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-lg">E-mail</h3>
        <p>{email}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Username</h3>
        <p>{username}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Change Password</h3>
        <p>here ou change it</p>
      </div>
    </div>
  );
};

export default Credentials;
