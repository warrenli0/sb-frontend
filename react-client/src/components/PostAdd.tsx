import React, { useState, ChangeEvent, FormEvent } from 'react';
import usePostService from '../hooks/usePostService';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../@types/common';

const PostAddComponent = () => {
    const { addPost } = usePostService();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post>({ _id: '', title: '', content: '', created_at: '', created_by: '', comments: [] });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newPostId = await addPost(post);
            navigate(`/post/${newPostId}`);
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full p-2 mt-1"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <textarea
                        id="content"
                        className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full p-2 mt-1"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Submit</button>
            </form>
        </div>
    );
};

export default PostAddComponent;
