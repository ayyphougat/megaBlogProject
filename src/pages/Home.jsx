import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status); // Check auth status from Redux store
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus) { // Fetch posts only if user is authenticated
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        } else {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [authStatus, navigate]);

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <div>
                            <h1 className="mb-5 text-5xl font-normal font-rubik bg-clip-text text-transparent bg-gradient-to-t from-slate-950 to-red-800 leading-10">
                                Welcome to the Blog Villa !!
                            </h1>
                            <p className='text-xl mt-5 font-mono font-bold p-3 flex justify-center capitalize'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="#152C7C" ><path d="m480-522 42 42 249-249-42-42-249 249ZM180-180h42l258-258-42-42-258 258v42Zm362-238L418-542l198-198-30-30-234 234-43-43 228-228q25-25 49.5-25.5T637-807l23 23 45-45q11-11 25-11t25 11l73 73q11 11 11 26t-11 26L542-418ZM244-120H120v-124l298-298 124 124-298 298Z"/></svg>
                                We Provide The Place <br /> You Provide The Words
                                <svg xmlns="http://www.w3.org/2000/svg" height="52px" viewBox="0 -960 960 960" width="52px" fill="#152C7C" ><path d="m480-522 42 42 249-249-42-42-249 249ZM180-180h42l258-258-42-42-258 258v42Zm362-238L418-542l198-198-30-30-234 234-43-43 228-228q25-25 49.5-25.5T637-807l23 23 45-45q11-11 25-11t25 11l73 73q11 11 11 26t-11 26L542-418ZM244-120H120v-124l298-298 124 124-298 298Z"/></svg>
                            </p>
                            <Button onClick={() => navigate("/all-posts")}
                                className="bg-gradient-to-l from-slate-950 to-blue-800 rounded-3xl mt-3 transition duration-1000 ease-in-out hover:bg-gradient-to-r"
                                >
                                Get Started
                            </Button>
                            </div>                    
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
