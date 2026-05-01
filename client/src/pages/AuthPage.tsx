function AuthPage() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        {/* TITLE */}
        <div className="flex-col text-center">
          <h1>ServiceNest</h1>
          <p className="text-gray-500">Local services, simplified</p>
        </div>

        {/* CONTAINER */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <form action="" method="post">
            {/* EMAIL */}
            <div>
              <label className="block text-sm pb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="you@example.com"
              />
            </div>
            {/* PASSWORD */}
            <div>
              <label className="block text-sm pb-2 font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="••••••••"
              />
            </div>
            {/* LOGIN */}'
            <div>
              <input
                type="submit"
                value="Login"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div>
          </form>

          <hr />

          <div className="flex flex-row justify-evenly">
            <button className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300">
              Provider
            </button>
            <button className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300">
              Client
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthPage
