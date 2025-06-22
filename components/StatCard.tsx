
const StatCard = ({
    icon,
  
    title,
  
    value,
  
    subvalue,
  }: {
    icon: React.ReactNode;
  
    title: string;
  
    value: string | number;
  
    subvalue?: string;
  }) =>{
    return (
      <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
        {icon}
  
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
  
          <p className="text-2xl font-bold text-purple-500">{value}</p>
  
          {subvalue && <p className="text-sm text-gray-700">{subvalue}</p>}
        </div>
      </div>
    
  )
}

export default StatCard