import Picker from "react-mobile-picker";

function renderOptions(options, selectedValue, onChange) {
	return options.map(option => (
		<Picker.Item
			key={option}
			value={option}
			className="flex h-[40px] cursor-pointer items-center justify-center text-lg font-medium leading-[22px] text-primary-dark opacity-100"
			onClick={() => onChange(option)}
		>
			{({ selected }) => (
				<div
					className={`
            flex min-h-[40px] cursor-pointer items-center justify-center text-lg font-medium leading-[22px] text-primary-dark
            ${selected ? "font-semibold opacity-100" : "text-neutral-400 opacity-30"}`}
				>
					{option}
				</div>
			)}
		</Picker.Item>
	));
}

function InlinePicker({ label, values, pickerValue, setPickerValue }) {
	return (
		<div className="mb-4 flex flex-col items-center">
			<div className="mb-2 flex w-[365px] justify-around">
				<h3 className="text-center text-[17px] font-medium leading-[20.72px] text-[#6BA5C4]">
					Environment
				</h3>
				<h3 className="text-center text-[17px] font-medium leading-[20.72px] text-[#6BA5C4]">
					Weather
				</h3>
			</div>
			<Picker
				className="picker-container w-[365px] px-4"
				value={pickerValue}
				onChange={setPickerValue}
				wheelMode="natural"
				height="120"
			>
				<Picker.Column name="environment">
					{renderOptions(values.environment, pickerValue.environment, value =>
						setPickerValue(prev => ({ ...prev, environment: value }))
					)}
				</Picker.Column>
				<Picker.Column name="weather">
					{renderOptions(values.weather, pickerValue.weather, value =>
						setPickerValue(prev => ({ ...prev, weather: value }))
					)}
				</Picker.Column>
			</Picker>
		</div>
	);
}

export default InlinePicker;
