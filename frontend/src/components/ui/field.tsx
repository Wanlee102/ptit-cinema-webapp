import type { FieldApi } from '@tanstack/react-form'
import { Label } from './label'
import { Input } from './input'
import { cn } from '@/utils/cn'

interface FieldInfoProps {
  field: any
  label: string
  placeholder?: string
  type?: string
  className?: string
}

export function FieldInfo({ field, label, placeholder, type = "text", className }: FieldInfoProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        type={type}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-sm font-medium text-destructive">
          {field.state.meta.errors.map((e: any) => e?.message || e).join(", ")}
        </p>
      ) : null}
    </div>
  )
}
