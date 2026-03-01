import { Card } from "@/components/ui/card";
import Image from "next/image";

interface StatCardProps {
  image: string;
  label: string;
  value: string;
}

export function StatCard({ image, label, value }: StatCardProps) {
  return (
    <Card className="p-4 rounded-none">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-between h-[65px]">
          <p className="text-3xl  p-2 font-bold leading-none">{value}</p>
          <p className="text-muted-foreground text-sm leading-none">{label}</p>
        </div>
        <Image
          src={image}
          alt={label}
          width={55}
          height={60}
          className="flex-shrink-0"
        />
      </div>
    </Card>
  );
}
