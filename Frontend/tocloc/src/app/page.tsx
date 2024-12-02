import Image from "next/image";
import RootLayout from "./layout";

export default function Home() {
  return (
    <div
      className="
        h-screen flex flex-col justify-center items-center gap-10
        bg-[url('/Background_esportes.jpg')] bg-cover
      "
    >
        <h1 className=" text-2xl text-black font-bold">Hello World</h1>

    </div>


  );

}
