

export function Table({ columns = [], data = [], actions = [] }) {
    return (
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full bg-white border-collapse mb-10">
          <thead>
            <tr className="bg-secondary text-white font-light font border-4">
              {columns.map((column, index) => (
                <th key={index} className="py-2 px-4 text-center">
                  {column}
                </th>
              ))}
              {actions.length > 0 && <th className="py-2 px-4 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t text-xl font-primary font-semibold border-4">
                {/* Acceso a los valores de las columnas en minúsculas */}
                {columns.map((column, cellIndex) => (
                  <td key={cellIndex} className="py-5 px-4 text-center">
                    {row[column.toLowerCase()] || 'N/A'} {/* Por si alguna clave no existe */}
                  </td>
                ))}
                {/* Renderizar las acciones */}
                {actions.length > 0 && (
                  <td className="py-5 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      {actions.map((ActionComponent, actionIndex) => (
                        <ActionComponent key={actionIndex} />
                      ))}
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
  