import React from "react";
import pp from "../../image/PP.jpg";
import aa from "../../image/Aong.jpg";
import developerPicture from "../../image/10168.png";

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Title */}
          <div className="flex justify-between">
            <div>
              <h2 className="mb-8 text-3xl font-bold md:text-5xl md:mb-10">
                Meet Developer
              </h2>
              <p className="mb-8 max-w-lg text-sm text-gray-500 sm:text-base md:mb-16">
              GGWelcome to the developer section! We are students from Rajamangala University of Technology Suvarnabhumi, passionate about web development and modern technology solutions. This e-commerce project is built using React, MySQL, and Prisma, with a focus on creating a seamless and user-friendly shopping experience. Our goal is to develop efficient, well-structured applications that meet real-world needs while ensuring a clean and responsive design. Feel free to explore the site, and if you have any feedback, we’d love to hear it! 🚀✨
              </p>
            </div>
            <div className="pr-12">
              <img
                src={developerPicture}
                alt=""
                className="inline-block w-full h-80 rounded-2xl object-cover "
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid gap-8 md:grid-cols-2 md:gap-4">
              <img
                src={pp}
                alt=""
                className="h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-2xl object-cover"
              />
              <div className="flex flex-col gap-5 rounded-2xl border border-solid border-black p-10 sm:p-12">
                <h2 className="text-3xl font-bold md:text-5xl">Atikorn Phee</h2>
                <h3 className="text-lg font-semibold text-gray-700">
                  | Full Stack Developer
                </h3>
                <p className="text-sm text-gray-500 sm:text-base">
                  I am a Full Stack Developer with a passion for building modern
                  web applications. I specialize in both front-end and back-end
                  development, ensuring seamless user experiences and robust
                  system architectures.
                </p>
                <div>
                  <h4 className="font-semibold">Contact:</h4>
                  <p className="text-sm text-gray-500">
                    LinkedIn:{" "}
                    <a
                      href="https://www.linkedin.com/in/atikorn-subsuieng-b820392b4"
                      className="text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.linkedin.com/in/atikorn-subsuieng-b820392b4
                    </a>{" "}
                    <br />
                    Email: 264318241004-st@rmutsb.ac.th
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-4">
              <img
                src={aa}
                alt=""
                className="h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-2xl object-cover"
              />
              <div className="flex flex-col gap-5 rounded-2xl border border-solid border-black p-10 sm:p-12">
                <h2 className="text-3xl font-bold md:text-5xl">
                  Chaiyaphat Aong
                </h2>
                <h3 className="text-lg font-semibold text-gray-700">
                  | Full Stack Developer
                </h3>
                <p className="text-sm text-gray-500 sm:text-base">
                  I am a Full Stack Developer with a passion for building modern
                  web applications. I specialize in both front-end and back-end
                  development, ensuring seamless user experiences and robust
                  system architectures.
                </p>
                <div>
                  <h4 className="font-semibold">Contact:</h4>
                  <p className="text-sm text-gray-500">
                    LinkedIn:{" "}
                    <a href="#" className="text-blue-600">
                      linkedin.com/in/yourname
                    </a>{" "}
                    <br />
                    Email: 264318241005-st@rmutsb.ac.th
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
