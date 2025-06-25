import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" flex justify-center py-4 text-sm text-gray-600  ">
      <p className="inline-flex items-center gap-1">
        © 2025 | Designed & developed by{" "}
        <a
          href="https://www.instagram.com/dharmeshbhati__167/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
        >
          <FaInstagram /> Dharmesh Bhati
        </a>{" "}
        with passion & precision.
      </p>
    </div>
  );
};

export default Footer;
