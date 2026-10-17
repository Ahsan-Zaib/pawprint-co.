import { useId } from "react";
import { Input } from "@/components/ui/input";

const petTypes = ["Dog", "Cat", "Rabbit", "Bird", "Guinea pig", "Hamster", "Ferret", "Reptile", "Fish", "Other"];

export function PetTypeSelect({ value, onChange, id, className, label = "Pet type" }: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  label?: string;
}) {
  const listId = useId();
  return <>
    <Input id={id} aria-label={label} list={listId} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Select or enter pet type" autoComplete="off" className={className} />
    <datalist id={listId}>{petTypes.map((type) => <option key={type} value={type.toLowerCase()}>{type}</option>)}</datalist>
  </>;
}