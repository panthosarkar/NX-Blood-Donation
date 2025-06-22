import React from "react";

const BloodReqPage = () => {
  return (
    <body className="bg-gray-50">
      <div className="container mx-auto max-w-4xl p-6 md:p-8 my-10 bg-white shadow-lg rounded-lg">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Request Information
          </h1>
          <p className="text-gray-700 text-sm">
            Fill out the form to request blood for yourself or someone in need.
            Provide key details like blood type, number of units, hospital, and
            urgency. Our system will instantly alert nearby verified donors.
            Every request is handled with speed, care, and confidentiality.
            Together, we can help save lives—one donation at a time.
          </p>
        </header>

        <form action="#" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="fast-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fast Name:
              </label>
              <input
                type="text"
                name="fast-name"
                id="fast-name"
                placeholder="Full Name"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                placeholder="Full Name"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="patient-age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Patient Age:
              </label>
              <select
                id="patient-age"
                name="patient-age"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Select number</option>
                <option>0-17</option>
                <option>18-30</option>
                <option>31-45</option>
                <option>46-60</option>
                <option>60+</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="blood-group"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blood Group:
              </label>
              <select
                id="blood-group"
                name="blood-group"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount:
              </label>
              <select
                id="amount"
                name="amount"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Select amount</option>
                <option>1 unit</option>
                <option>2 units</option>
                <option>3 units</option>
                <option>4 units</option>
                <option>5+ units</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="date-of-donation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of donation:
              </label>
              <input
                type="text"
                name="date-of-donation"
                id="date-of-donation"
                placeholder="Select date"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Condition:
              </label>
              <select
                id="condition"
                name="condition"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Select</option>
                <option>Urgent</option>
                <option>Routine</option>
                <option>Emergency</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="contact-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Number:
              </label>
              <input
                type="tel"
                name="contact-number"
                id="contact-number"
                placeholder="Select number"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location:
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Search location"
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm pr-10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-1">
              <svg
                className="w-full h-64 object-cover border border-gray-300 rounded-md bg-gray-100 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 100"
                preserveAspectRatio="xMidYMid slice"
                aria-label="Map placeholder"
              >
                <rect
                  width="200"
                  height="100"
                  className="fill-current text-gray-200"
                />
                <path
                  d="M0 70 Q 50 90, 100 70 T 200 70 L 200 100 L 0 100 Z"
                  className="fill-current text-green-300 opacity-50"
                />
                <path
                  d="M0 80 Q 50 60, 100 80 T 200 80"
                  stroke-width="2"
                  className="stroke-current text-blue-400 opacity-60"
                  fill="none"
                />
                <circle
                  cx="70"
                  cy="50"
                  r="3"
                  className="fill-current text-red-500"
                />
                <circle
                  cx="130"
                  cy="60"
                  r="3"
                  className="fill-current text-red-500"
                />
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-family="sans-serif"
                  font-size="10px"
                  className="fill-current text-gray-500"
                >
                  Map Area
                </text>
              </svg>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason:
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                placeholder="write your reason here"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Send blood request
            </button>
          </div>
        </form>
      </div>
    </body>
  );
};

export default BloodReqPage;
