
function DurationComponent({className}: {className: string}) {
    return (
        <>
            <select
                name="category"
                id="category"
                className={`${className ? className : "p-2 border rounded-md"}`}
            >
                <option value="one_week">1 week</option>
                <option value="two_weeks">2 weeks</option>
                <option value="three_weeks">3 weeks</option>
                <option value="one_month">1 month </option>
                <option value="two_month">2 months </option>
                <option value="three_month">3 months </option>
                <option value="six_month">6 months </option>
                <option value="one_year">1 year </option>
                <option value="one_and_half_years">1 and half years </option>
                <option value="two_years">2 years </option>
            </select>
        </>
    )
}

export default DurationComponent