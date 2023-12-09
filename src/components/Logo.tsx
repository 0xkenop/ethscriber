import Image from 'next/image';

export const Logo = () => {
  return (
    <div>
      <Image src="/logoSmall.jpg" alt="Logo" width={150} height={60}/>
    </div>
  );
};
