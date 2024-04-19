import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePostService from '../hooks/usePostService';
import { Post } from '../@types/common';

const PostListComponent = () => {
    const { getPosts } = usePostService();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            if (data) {
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Post List</h1>
                <Link to="/add-post" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Add Post</Link>
            </div>
            <ul>
                {posts.map(post => (
                    <li key={post._id} className="mb-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Link to={`/post/${post._id}`} className="text-lg text-blue-600 hover:text-blue-800 font-semibold">{post.title}</Link>
                        <p className="text-sm text-gray-600">Posted by {post.created_by}</p>
                        <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostListComponent;
