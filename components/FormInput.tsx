interface Input {
  id: string
  label: string
  type: string
  autoComplete: string
  require?: boolean
  className?: string
  placeholder?: string
  min?: number | string
  max?: number | string
}

export default function FormInput({
  id,
  label,
  type,
  autoComplete,
  require,
  className,
  placeholder,
  max,
  min,
}: Input) {
  return (
    <label htmlFor={id} className={className}>
      {label}
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        {...(require ? 'required' : '')}
        placeholder={placeholder}
        max={max}
        min={min}
      />
    </label>
  )
}
