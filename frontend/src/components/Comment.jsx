import React from 'react'
import { format } from 'timeago.js'
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Comment = ({comment, postId}) => {

  const { getToken } = useAuth();
  const { user } = useUser();

  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  // Mutation for delete comment

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment deleted successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    },
  });


  const handleDelete = async (e) => {

    e.preventDefault();

    if (window.confirm('Are you sure you want to delete this comment?')) {
      mutation.mutate();
    }

  }

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">

      <div className="flex items-center gap-4">
          <img src={comment.author.img} className="w-10 h-10 rounded-full object-cover" w="40" />
          <span className='font-medium'>{comment.author.username}</span>
          <span className="text-sm text-gray-500">{ format(comment.createdAt) }</span>

          { ( user?.username === comment.author.username || role === "admin" ) &&
            <span className="ml-auto text-xs text-red-500 hover:text-red-700 cursor-pointer" onClick={handleDelete}>
              { mutation.isPending ? "Deleting..." : "Delete" }
            </span>
          }
      </div>

      <div className="mt-4">
        <p>{comment.content}</p>          
      </div>

    </div>
  )
}

export default Comment