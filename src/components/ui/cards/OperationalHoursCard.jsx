export function OperationalHoursCard({day, startTime, endTime}) {
    return (
        <div className="flex gap-4 border border-l-secondary border-l-4 p-2 rounded-sm">
            <p>
                <strong>{day}</strong>
            </p>
            <p>|</p>
            <p>{startTime}</p>
            <p>|</p>
            <p>{endTime}</p>
        </div>
    );
}
