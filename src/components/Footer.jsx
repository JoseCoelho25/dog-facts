import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 h-20 w-screen flex justify-center">
      <Link to="https://github.com/JoseCoelho25" className="hover:underline">Developed by José Coelho</Link>
    </footer>
  )
}

