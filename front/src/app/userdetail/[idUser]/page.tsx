import { IParamsUser } from "@/interfaces/params";
import UserDetail from '@/components/UserDetail/UserDetail';



const UserDetailPage: React.FC<IParamsUser> = async ({ params }) => {
  const UserId = (await params).idUser;

  return <UserDetail params={UserId} />;
};

export default UserDetailPage;
