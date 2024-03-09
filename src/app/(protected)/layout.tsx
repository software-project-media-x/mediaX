import Navbar from "@/components/navbar";

const AuthLayout = async (
  { children }: { children: React.ReactNode }
) => {
  return (
    <>
      <Navbar />
      <main className="h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-400 to-gray-800">
        <div className="flex items-center justify-center ">
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
