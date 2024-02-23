import React from 'react'

type PageProps = {
  children: React.ReactNode;
}

export const PageWrapper = ({children} : PageProps) => {
  return (
    <div className='p-5 lg:px-20 mx-auto max-w-6xl'>
      {children}
    </div>
  )
}
