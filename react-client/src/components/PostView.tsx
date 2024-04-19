import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePostService from '../hooks/usePostService';
import { Post } from '../@types/common';

const PostViewComponent = () => {
    const { getPost } = usePostService();
    const [post, setPost] = useState<Post>();
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPost(id || '');
            if (data) {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    const addComment = async () => {
        // Implement logic to add a comment to the post
        // Update the post state to reflect the new comment
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
            <p className="text-gray-600 mb-4">
                <strong>Posted by:</strong> {post.created_by} on {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="border-b border-gray-200 pb-3 mb-3">{post.content}</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Comments</h3>
            {post.comments && post.comments.map((comment, index) => (
                <div key={index} className="mb-4 bg-gray-100 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">
                        {comment.created_by} on {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">{comment.text}</p>
                </div>
            ))}

            <div className="mt-6">
                <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 p-2 rounded-md w-full mb-4"
                    placeholder="New comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={addComment} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                    Add Comment
                </button>
            </div>
        </div>
    );
};

export default PostViewComponent;
