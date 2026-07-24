function ProfilePage() {
  return (
    <div className="bg-page-bg border border-border rounded-xl p-4 sm:p-8 w-full max-w-md flex flex-col justify-center items-center">
      <form className="w-full space-y-5">
        <h1 className="text-xl font-semibold text-text-primary">Business info</h1>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3 ">
            <label htmlFor="provider-address" className="sn-label">
              Home Base Address
            </label>
            <input
              id="provider-address"
              type="text"
              className="sn-input"
              placeholder="123 Main st"
              required
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="provider-city" className="sn-label">
              City
            </label>
            <input
              id="provider-city"
              type="text"
              className="sn-input"
              placeholder="Fayetteville"
              required
            />
          </div>

          <div>
            <label htmlFor="provider-state" className="sn-label">
              State
            </label>
            <input id="provider-state" type="text" className="sn-input" placeholder="NC" required />
          </div>

          <div className="col-span-2">
            <label htmlFor="provider-zip" className="sn-label">
              Zip
            </label>
            <input
              id="provider-zip"
              type="text"
              className="sn-input"
              placeholder="28303"
              required
            />
          </div>

          <div className="col-span-3">
            <label htmlFor="provider-number" className="sn-label">
              Phone Number
            </label>
            <input
              id="provider-number"
              type="tel"
              className="sn-input"
              placeholder="(910) 555-0100"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="provider-radius" className="sn-label">
              Service Radius
            </label>
            <input
              id="provider-radius"
              type="number"
              className="sn-input"
              placeholder="15"
              required
            />
          </div>
        </div>

        <div className="flex justify-start pt-2">
          <button type="submit" className="sn-btn-secondary">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  )
}
export default ProfilePage
