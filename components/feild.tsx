export default function Field({ name, label, type, autoComplete, required }) {
    return (
        <div>
            <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
                {label}
            </label>
            <br />
            {">"}<input
                className="terminal border-0 text-light"
                autoComplete={autoComplete}
                id={[name, 'input'].join('-')}
                name={name}
                required={required}
                type={type}
            />
        </div>
    )
}