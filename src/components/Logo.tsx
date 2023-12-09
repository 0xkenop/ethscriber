import Image from "next/image";

export const Logo = () => {
  return (
    <div className="logoWrap">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={50}
        height={50}
        className="logo"
      />
      EORC 20
    </div>
  );
};
