export const Home = () => {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Process Your <span className="text-blue-500">CSV Files</span> with
            Ease
          </h1>
          <p className="mt-6 text-lg text-gray-400">
            Upload your data and explore insights with interactive charts
            powered by Google Charts.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#"
              className="px-6 py-3 text-lg font-medium bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg"
            >
              Upload Now
            </a>
            <a
              href="#features"
              className="px-6 py-3 text-lg font-medium border border-gray-500 hover:border-white rounded-lg"
            >
              Explore Features
            </a>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/2">
          <img
            src="https://via.placeholder.com/600x400"
            alt="CSV File Processing Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-400">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">
                About CSV Charts
              </h3>
              <p className="mt-4">
                Our platform simplifies data visualization, making it accessible
                and interactive for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#upload" className="hover:text-white">
                    Upload CSV
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#support" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <ul className="mt-4 flex space-x-4">
                <li>
                  <a href="#" className="hover:text-white"></a>
                </li>
                <li>
                  <a href="#" className="hover:text-white"></a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <p className="mt-4">
                CSV Visuals Inc. <br />
                Tech City, Innovation Zone
              </p>
              <p className="mt-2">Email: support@csvcharts.com</p>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-gray-700 pt-4">
            <p>© 2024 CSV Visuals Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
