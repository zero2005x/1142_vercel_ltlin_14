import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function RatingInput_14({
  name,
  labelText,
}: {
  name: string;
  labelText?: string;
}) {
  const numbers = Array.from({ length: 5 }, (_, index) =>
    (index + 1).toString()
  ).reverse();

  return (
    <div className='mb-2 max-w-xs'>
      <Label htmlFor={name} className='capitalize'>
        {labelText || name}
      </Label>
      <Select defaultValue={numbers[0]} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingInput_14;
