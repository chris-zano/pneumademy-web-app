
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DurationComponent({ className, field_name, onChangeHandler }: { className: string, field_name: string, onChangeHandler: (e: any) => void }) {
    return (
        <>
            <select
                name={field_name}
                id="category"
                className={`${className ? className : "p-2 border rounded-md"}`}
                onChange={onChangeHandler}
            >
                <option value="">Select a duration</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="3 weeks">3 weeks</option>
                <option value="1 month">1 month </option>
                <option value="2 months">2 months </option>
                <option value="3 months">3 months </option>
                <option value="6 months">6 months </option>
                <option value="1 year">1 year </option>
                <option value="1 and half years">1 and half years </option>
                <option value="2 years">2 years </option>
            </select>
        </>
    )
}

export default DurationComponent