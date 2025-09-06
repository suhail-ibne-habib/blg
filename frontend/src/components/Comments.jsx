import React, {useRef} from 'react';
import Comment from './Comment';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';

const fetchComments = async (postId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return res.data;
};

const Comments = ({ postId }) => {

  const { getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();

  const textareaRef = useRef(null);

  // Fetch comments
  const { isPending, error, data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  // Mutation for new comment
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      if (textareaRef.current) textareaRef.current.value = '';
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    },
  });

  if (isPending) return 'Loading.....';
  if (error) return 'An error has occurred: ' + error.message;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      content: formData.get('content'),
    };

    // Pass form context so we can reset on success
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>

      {!isSignedIn ? (
        <p className="text-gray-500">Please login to write a comment</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center justify-between gap-8 w-full">
          <textarea
            className="w-full p-4 rounded-xl"
            name="content"
            placeholder="Write a comment..."
            ref={textareaRef}
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`bg-blue-800 px-4 py-3 text-white font-medium rounded-xl ${
              mutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'
            }`}
          >
            {mutation.isPending ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}

      <>
        {mutation.isPending && (
          <Comment
            comment={{
              content: `${mutation?.variables?.content} (Sending...)`,
              createdAt: format(new Date()),
              author: {
                username: user?.username,
                img: user?.imageUrl,
              },
            }}
          />
        )}

        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </>
      <div className="mb-2"></div>
    </div>

  );
};

export default Comments;
