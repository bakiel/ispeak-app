import { getStatistics } from '@/lib/content'

export default async function StatisticsBanner() {
  const statistics = await getStatistics()
  
  // Fallback data if database is empty
  const defaultStats = [
    { title: 'Countries', value: '170+', icon: 'fas fa-globe', icon_color: 'text-yellow-300' },
    { title: 'Students', value: '100,000+', icon: 'fas fa-user-graduate', icon_color: 'text-yellow-300' },
    { title: 'Hours of Classes', value: '1.85M+', icon: 'fas fa-clock', icon_color: 'text-yellow-300' },
    { title: 'Satisfaction Rate', value: '97%', icon: 'fas fa-star', icon_color: 'text-yellow-300' }
  ]
  
  const stats = statistics.length > 0 ? statistics : defaultStats

  return (
    <section className="bg-teal-500 text-white py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.id || index} className="flex flex-col items-center">
              <i className={`${stat.icon} text-3xl md:text-4xl mb-2 md:mb-3 ${stat.icon_color || 'text-yellow-300'}`}></i>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-base md:text-lg">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}