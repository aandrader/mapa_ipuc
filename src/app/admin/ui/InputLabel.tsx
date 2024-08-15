import { Input } from "@/components/ui/input";

export function InputLabel({
  label,
  name,
  defaultValue,
  readOnly,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  readOnly?: boolean;
  type?: string;
}) {
  return (
    <div>
      <p>{label}</p>
      <Input
        name={name}
        type={type}
        className={readOnly ? "focus-visible:ring-transparent" : ""}
        autoCapitalize="none"
        autoCorrect="off"
        defaultValue={defaultValue ?? ""}
        readOnly={readOnly}
      />
    </div>
  );
}
