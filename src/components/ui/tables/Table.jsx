export function Table({ columns = [], data = [], actions = [] }) {
    return (
        <div className="overflow-x-auto sm:overflow-hidden mt-10">
            <table className="min-w-full bg-white border-collapse mb-10">
                <thead>
                    <tr className="bg-secondary text-white font-light border-4">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="py-2 px-4 text-center text-sm sm:text-base md:text-lg lg:text-xl"
                            >
                                {column}
                            </th>
                        ))}
                        {actions.length > 0 && (
                            <th className="py-2 px-4 text-center text-sm sm:text-base md:text-lg lg:text-xl">
                                Confirmations
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-t text-sm sm:text-base md:text-lg lg:text-xl font-primary font-semibold border-4"
                        >
                            {columns.map((column, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="py-5 px-4 text-center"
                                >
                                    {row[column.toLowerCase()] || 'N/A'}
                                </td>
                            ))}

                            {actions.length > 0 && (
                                <td className="py-5 px-4 text-center">
                                    <div className="flex justify-center space-x-2">
                                        {actions.map(
                                            (ActionComponent, actionIndex) => (
                                                <ActionComponent
                                                    key={actionIndex}
                                                />
                                            )
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
