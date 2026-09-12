import type { CustomerInfo } from "../../lib/types";
import type { ValidationErrors } from "../../lib/validation";

interface CheckoutFormProps {
  values: CustomerInfo;
  errors: ValidationErrors;
  onChange: (field: keyof CustomerInfo, value: string) => void;
}

interface FieldConfig {
  name: keyof CustomerInfo;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  type?: string;
}

const FIELDS: FieldConfig[] = [
  {
    name: "name",
    label: "Nombre completo",
    placeholder: "Ej. Ana García",
    autoComplete: "name",
    required: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    placeholder: "Ej. 4521234567",
    autoComplete: "tel",
    required: true,
    type: "tel",
  },
  {
    name: "address",
    label: "Dirección de entrega",
    placeholder: "Calle, número, colonia",
    autoComplete: "street-address",
    required: true,
  },
  {
    name: "city",
    label: "Ciudad",
    placeholder: "Ej. Uruapan",
    autoComplete: "address-level2",
    required: true,
  },
  {
    name: "postalCode",
    label: "Código postal",
    placeholder: "Ej. 60050",
    autoComplete: "postal-code",
    required: true,
  },
  {
    name: "references",
    label: "Referencias de entrega (opcional)",
    placeholder: "Ej. Casa azul, portón negro",
  },
];

export default function CheckoutForm({
  values,
  errors,
  onChange,
}: CheckoutFormProps) {
  return (
    <div className="flex flex-col gap-4">
      {FIELDS.map((field) => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-white/80"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type ?? "text"}
            autoComplete={field.autoComplete}
            required={field.required}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={(e) => onChange(field.name, e.target.value)}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={
              errors[field.name] ? `${field.name}-error` : undefined
            }
            className={`rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-green ${
              errors[field.name] ? "border-red-500/70" : "border-white/15"
            }`}
          />
          {errors[field.name] && (
            <p id={`${field.name}-error`} className="text-xs text-red-400">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
