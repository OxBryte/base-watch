import { useAppKit } from "@reown/appkit/react";

export default function ConnectButton() {
    const { open } = useAppKit();

  return (
    <div className="">
      <p className="text-xs px-5 py-2 bg-[#0000ff] hover:bg-white/20 rounded-full cursor-pointer" onClick={open}>
        Connect wallet
      </p>
    </div>
  );
}
