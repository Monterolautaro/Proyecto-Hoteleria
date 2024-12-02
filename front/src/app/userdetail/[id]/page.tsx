import UserDetail from '@/components/UserDetail/UserDetail';

const UserDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto">
      <UserDetail userId={params.id} />
    </div>
  );
};

export default UserDetailPage;
