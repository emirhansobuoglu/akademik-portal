import Image from "next/image";
import LoginClient from "./components/auth/login-client";

export default function Home() {
  return (
    <>
      <div>
        <div className="w-full p-3 h-[200px] mt-10">
          <p className="tracking-wider text-2xl h-auto mx-auto text-slate-800 font-thin text-center">
            Kocaeli Üniversitesi Akademik Platformu
          </p>
          <br />
          <Image
            height={150}
            width={150}
            className="z-10 mx-auto"
            alt="koulogo"
            src="/koulogo.png"
            quality={100}
          />
        </div>
        <br />
        <LoginClient />
      </div>
    </>
  );
}
