import { Card } from '../components/Card';

interface PlaceholderProps {
  title: string;
  description: string;
}

export const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500">Esta página está em desenvolvimento</p>
        </div>
      </Card>
    </div>
  );
};
