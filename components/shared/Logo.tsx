import Image from "next/image";
import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Clean - No Box */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src="/logo.png"
          alt="Mubix Labs"
          fill
          className="object-contain transition-transform group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col -space-y-0.5">
        <span className={`text-2xl font-bold tracking-tighter ${light ? 'text-white' : 'text-zinc-900'}`}>
          Mubix<span className="text-brand-600">Labs</span>
        </span>
        <span className="text-[10px] font-medium tracking-widest text-zinc-400">
          SOFTWARE STUDIO
        </span>
      </div>
    </Link>
  );
}