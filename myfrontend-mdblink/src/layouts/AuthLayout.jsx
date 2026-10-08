function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;