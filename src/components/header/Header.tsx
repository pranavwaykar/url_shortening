import Logo from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";
import Button from "../Button";

interface HeaderProps {
  toggleMenu: () => void;
}

export default function Header({ toggleMenu }: HeaderProps) {
  return (
    <header className="flex justify-between items-center font-semibold py-6 mx-6 md:mx-12 lg:mx-20">
      {/* Temporarily giving it an x padding. */}
      <div className="flex gap-10 ">
        <Logo />

        <ul className="md:flex gap-5 hidden">
          <li className="text-gray hover:text-verydarkviolet cursor-pointer">
            Features
          </li>
          <li className="text-gray hover:text-verydarkviolet cursor-pointer">
            Pricing
          </li>
          <li className="text-gray hover:text-verydarkviolet cursor-pointer">
            Resources
          </li>
        </ul>
      </div>

      <AiOutlineMenu
        size={30}
        className="text-gray cursor-pointer flex md:hidden"
        onClick={toggleMenu}
      />

      <div className="md:flex gap-5 items-center hidden">
        <p className="text-gray hover:text-verydarkviolet cursor-pointer">
          Login
        </p>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}
