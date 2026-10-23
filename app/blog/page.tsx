
import React from 'react'
import BlogSection from '../components/blog/BlogSection'

import blog from '@/app/data/blog.json'

function page() {
  return (
    <div>
      <BlogSection
        post={blog.post ?? []}
        breadcrum={blog.breadcrum} />
    </div>
  )
}

export default page