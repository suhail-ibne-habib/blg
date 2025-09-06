import { useAuth, useUser } from '@clerk/clerk-react'
import React, {useState} from 'react'
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from 'react-quill-new'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify' 
import Upload from '../components/Upload'
import { useEffect } from 'react'
import { motion } from "framer-motion";

function Write() {

  const [ value, setValue ] = useState('')
  const [cover, setCover] = useState('')
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    image && setValue(value + `<p><img src="${image.url}" alt="Image"/></p>`)
  }, [image])

  const navigate = useNavigate()

  const {getToken} = useAuth()

  const mutation = useMutation({
    mutationFn:  async (newPost) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: res => {
      toast("Post has been created successfully!", { type: "success" }),
      navigate(`/posts/${res.data.slug}`)
    }

  })

  const { isLoaded, isSignedIn } = useUser()

  if( !isLoaded ){
    return <div>Loading....</div>
  }

  if( isLoaded && !isSignedIn){
    return <div>Available for only logged in user...</div>
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      cover: cover.filePath || "",
      title: formData.get('title'),
      content: value,
      category: formData.get('category'),
      desc: formData.get('desc')
    };

    console.log(data);

    mutation.mutate(data);
  }



  return (
    <div className="h-[calc(100vh - 65px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">

      <h1 className='text-xl font-light'>Create a New Post</h1>

      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-6 flex-1 mb-6'>

        <div className="mt-4 w-64 h-40 border-2 border-gray-300 rounded-xl overflow-hidden relative">
          {progress > 0 && progress < 100 && (
            <div className="absolute top-0 left-0 w-full h-full bg-blue-200/50 flex items-center justify-center">
              <span className="text-blue-700 font-semibold">{progress}%</span>
            </div>
          )}
          {cover && (
            <img
              src={cover.url}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          )}
      </div>

        <Upload setData={setCover} setProgress={setProgress} type="image"> <button type='button' className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover image</button> </Upload>

        <input type="text" className='text-4xl font-semibold bg-transparent outline-none' placeholder="My Awesome Story" name="title" id="" />

        <div className="flex items-center gap-4">

          <label htmlFor="" className='text-sm'>Choose a category: </label>

          <select name="category" id="" className='p-2 rounded-xl bg-white shadow-md'>
            <option value="default">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Enginges</option>
            <option value="marketing">Marketing</option>
          </select>

        </div>

        <textarea name="desc" className='p-4 rounded-xl bg-white shadow-md' placeholder='A Short Description' id=""></textarea>

        <div className="flex flex-col flex-1 gap-0">
          <Upload setData={setImage} setProgress={setProgress} type="image">
              <button type="button" className='w-max p-2 shadow-md rounded-t-xl text-sm text-gray-500 bg-white'>Add image</button>
          </Upload>
          <ReactQuill 
            className='flex-1 rounded-b-xl rounded-tr-xl bg-white shadow-md' 
            theme="snow" 
            value={value} 
            onChange={setValue} 
            readOnly={ progress > 0 && progress < 100 }
          />
        </div>

        <button disabled={mutation.isPending || ( progress > 0 && progress < 100 )} className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-4 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'>
          {mutation.isPending ? "Publishing..." : "Publish"}
        </button>

        {"Progress: " + progress + "%"}

        {mutation.isError && <p className='text-red-500'>Something went wrong! {mutation.error.message}</p>}

      </form>

    </div>
  )
}

export default Write