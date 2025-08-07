import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './pages/Layout'
import Dashboard from './Pages/Dashboard'
import WriteArticle from './Pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'


function App() {
  
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='write-article' element={<WriteArticle/>}/>
          <Route path='blog-title' element={<BlogTitles/>}/>
          <Route path='generate-images' element={<GenerateImages/>}/>
          <Route path='remove-background' element={<RemoveBackground/>}/>
          <Route path='remove-object' element={<RemoveObject/>}/>
          <Route path='review-resume' element={<ReviewResume/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
