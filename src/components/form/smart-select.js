import { useField } from 'formik';
import { useState } from 'react';
import Select from 'react-select';

const SmartSelect = ({ options, initialValue, count = 10, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [defaultOptions, setDefaultOptions] = useState(options.slice(0, count));
    const [selectedOption, setSelectedOption] = useState(initialValue ? options.find(o => o.value === initialValue) : null);
    const { setValue } = helpers;

    const handleChange = (selectedOption) => {
        setValue(selectedOption.value);
        setSelectedOption(selectedOption);
    };

    const handleInputChange = (inputValue) => {
        const filteredOptions = options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()));
        setDefaultOptions(filteredOptions.slice(0, count));
    }

    return (
        <div>
            <Select
                {...field}
                {...props}
                value={selectedOption}
                onChange={handleChange}
                options={defaultOptions}
                onInputChange={handleInputChange}
                isSearchable
            />
            {meta.touched && meta.error ? (
                <div className="text-danger">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default SmartSelect;