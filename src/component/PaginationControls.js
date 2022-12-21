import React from 'react'

const PaginationControls = ({ totalMovies, currentPage, moviesPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalMovies / moviesPerPage)

  return (
    <div className="flex gap-4 self-center">
      <button
        className="px-4 py-2 text-white rounded-full bg-white/20 hover:bg-white/40"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className={`px-4 py-2 text-white rounded-full ${
            i + 1 === currentPage ? 'bg-white/50' : 'bg-white/20'
          } hover:bg-white/40`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 text-white rounded-full bg-white/20 hover:bg-white/40"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationControls
