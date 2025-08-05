import Link from 'next/link'
import Image from 'next/image'
import { logoUrls } from '@/lib/logoConfig'

export default function HeroSection() {
  return (
    <section className="hero-pattern relative">
      <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
      <div className="container mx-auto px-4 py-10 md:py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h5 className="text-yellow-300 font-semibold tracking-wide mb-2 text-sm md:text-base">
              AFRICAN LANGUAGE LEARNING FOR CHILDREN AGES 3-14
            </h5>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              LIVE 1:1 LESSONS WITH INDIGENOUS LANGUAGE SPEAKERS!
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-100">
              Connect your child to their heritage through interactive online lessons in Yoruba, Kiswahili, Twi, and Amharic with certified native-speaking educators.
            </p>
            <div className="space-y-4">
              <Link 
                href="/register" 
                className="btn-primary px-6 py-3 rounded-md inline-block text-base md:text-lg w-full md:w-auto text-center"
              >
                Start your child's learning journey TODAY!
              </Link>
              <p className="text-gray-200 italic text-center md:text-left">or explore our programs below</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md">
              <img 
                src="https://i.ibb.co/VWZCpgHg/Child-learning-online-with-headphones.png" 
                alt="Child learning online" 
                className="rounded-lg shadow-2xl z-10 relative w-full"
              />
              <div className="absolute -bottom-6 -right-6 z-20 float-animation hidden md:block">
                <img 
                  src={logoUrls.pajiMascot} 
                  alt="Paji mascot" 
                  className="w-16 h-16 md:w-24 md:h-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
