export function ServiceCard({title, description, customClass=''}) {
    return (
        <div className={`w-full p-4 bg-gray-100 relative border border-light-grey rounded-md transition-all duration-100 hover:shadow-md hover:scale-105 ${customClass}`}>
            <h4>{title}</h4>
            <p className="text-black">
                min price: <strong>$17</strong>
            </p>
            <p className="text-black">
                max price: <strong>$27</strong>
            </p>
        </div>
    );
}
