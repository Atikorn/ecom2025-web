import React from 'react'
import P from "../../image/PP.jpg";

const Profiles = () => {
  return (
    <div className=" py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Developer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img className="w-16 h-16 mx-auto bg-gray-300 rounded-full mb-4" src={P}></img>
            <p className="text-gray-700">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut eros nec felis volutpat efficitur."
            </p>
            <h3 className="mt-4 font-semibold text-gray-900">- Atikorn Phee</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 mx-auto bg-gray-300 rounded-full mb-4"></div>
            <p className="text-gray-700">
              "Suspendisse potenti. Nulla facilisi. Nam posuere, leo vel aliquet interdum, justo justo cursus justo."
            </p>
            <h3 className="mt-4 font-semibold text-gray-900">- Jane Smith</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles