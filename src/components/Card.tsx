interface CardProps {
  title: string;
  value: any;
}

export const Card = ({ title, value }: CardProps) => (
  <div className="border p-4 rounded shadow bg-white">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);