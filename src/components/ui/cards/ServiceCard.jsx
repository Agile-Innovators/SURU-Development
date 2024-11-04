export function ServiceCard({
    title,
    description,
    customClass = '',
    price,
    maxPrice,
}) {
    return (
        <div
            className={`w-full p-4 grid gap-1 bg-gray-100 relative border border-light-grey rounded-md transition-all duration-100 hover:shadow-md hover:scale-105 ${customClass}`}
        >
            <h4>{title}</h4>
            <p>{description}</p>
            <p className="text-black">
                price: <strong>{price}</strong>
            </p>
            {maxPrice ? (
                <p className="text-black">
                    max price: <strong>{maxPrice}</strong>
                </p>
            ) : (
                ''
            )}
        </div>
    );
}
