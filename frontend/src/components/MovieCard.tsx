import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { Button } from './ui/button'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  index?: number
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <div className="group relative overflow-hidden rounded-xl aspect-[2/3] cursor-pointer">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-xl text-white mb-1 line-clamp-1">{movie.title}</h3>
            <p className="text-sm text-gray-300 mb-3 line-clamp-1">{movie.genre}</p>
            
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              <div className="flex items-center gap-2 text-sm text-white">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
