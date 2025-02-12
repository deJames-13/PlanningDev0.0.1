import { CSpinner } from '@coreui/react';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const SmartSelect = ({ options = [], initialValue, customNoneLabel, count = 10, ...props }) => {
    const { loading, ...rest } = props;
    const [field, meta, helpers] = useField(rest);
    const [defaultOptions, setDefaultOptions] = useState((options || []).slice(0, count));
    const [selectedOption, setSelectedOption] = useState(initialValue ? (options || []).find(o => o.value === initialValue) : null);
    const { setValue } = helpers;

    const handleChange = (selectedOption) => {
        if (selectedOption.value === 'none') {
            setValue(null);
            setSelectedOption({ label: customNoneLabel || 'None', value: 'none' });
        } else {
            setValue(selectedOption.value);
            setSelectedOption(selectedOption);
        }
    };

    const handleInputChange = (inputValue) => {
        const filteredOptions = (options || []).filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()));
        if (filteredOptions?.length !== 0) {
            setDefaultOptions(filteredOptions.slice(0, count));
        }
    };

    useEffect(() => {
        if (options?.length > 0) {
            setDefaultOptions(options.slice(0, count));
        }
    }, [options, count]);

    useEffect(() => {
        if (initialValue) {
            const option = options.find(o => o.value === initialValue);
            setSelectedOption(option);
        }
    }, [initialValue]);

    return loading ? <CSpinner /> : (
        <div>
            <Select
                {...field}
                {...props}
                value={selectedOption}
                onChange={handleChange}
                options={[
                    { label: customNoneLabel || 'None', value: 'none' },
                    ...defaultOptions
                ]}
                onInputChange={handleInputChange}
                isSearchable
            />

        </div>
    );
};

export default SmartSelect;