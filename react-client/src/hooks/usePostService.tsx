import { useState, useEffect } from 'react';
import { Post } from '../@types/common';

const usePostService = () => {
    const baseUrl = 'http://localhost:5000/api/posts';

    const getPosts = async () => {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getPost = async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const addPost = async (post: Post) => {
        try {
            const postWithTimestamp = {
                ...post,
                created_at: new Date().toISOString()
            };

            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postWithTimestamp),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newPost = await response.json();
            return newPost.id;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    return { getPosts, getPost, addPost };
};

export default usePostService;
