import dynamic from "next/dynamic";

const AdminLogin = dynamic(
  () => import("../../components/Admin/AdminLogin/AdminLogin"),
  {
    ssr: false,
  }
);

const Admin = () => {
  return <AdminLogin />;
};

export default Admin;
