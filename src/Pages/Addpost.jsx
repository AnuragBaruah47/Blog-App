import React, { useEffect, useState } from 'react'
import { Container,PostForm } from '../Components/Index'

function Addpost() {
    const [posts,setPosts]=useState([])
  return (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default Addpost