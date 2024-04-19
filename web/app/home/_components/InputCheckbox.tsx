import clsx from 'clsx';

export default function InputCheckbox({
    id,
    labelText,
    onChange,
    disabled = false,
    required = false,
}: {
    id: string;
    labelText: string;
    onChange: (evt: { target: { checked: boolean } }) => void;
    disabled: boolean;
    required?: boolean;
    checked: boolean
}) {
    return (
        <div className="flex items-center mb-4">
            <input
                id={id}
                type="checkbox"
                disabled={disabled}
                required={required}
                onChange={onChange}
                className={clsx(["w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"])}
            />
            <label htmlFor={"checkbox-" + id} className="ms-2 text-sm font-medium text-gray-400 border-gray-600 focus:border-blue-500 focus:ring-blue-500">{labelText}</label>
        </div>
    );
}
