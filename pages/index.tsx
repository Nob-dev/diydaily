import Head from "next/head"
import Link from "next/link";
import Header from '../components/Header'
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}
export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>DIY Daily Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <div className="flex justify-between items-center bg-teal-700 border-y border-yellow-600 py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="text-blue-500 underline decoration-blue-500 decoration-4"> 
            D I Y 
            </span> {""}
               Daily provides you access to specially curated, free educative and informative "Do It Yourself" tutorial contents.
          </h1>
          <h2>
             Our mission is to build and promote real world and online open-source 
             collaborative community platform, where people irrespective of
             education background, age or gender can meet online or in real life location, 
             collaborate, learn, build, and develop awesome projects together; with provision of
             free or subsidized internet access for rural and unreached places.
          </h2>
        </div>

        <img 
        className="hidden md:inline-flex h-32 lg:h-full" 
        src="https://res.cloudinary.com/nob-dev/image/upload/v1654101644/tofmq5cqcc4u5hm93vfc.png" 
        alt="" 
        />
      </div>
      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="" />
              <div className="flex justify-between p-5 bg-white">
                <div className="">
                  <p>{post.title}</p>
                  <p>{post.description} by {post.author.name} </p>
                  <img className="w-12 h-12 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
                </div>
              </div>
            </div>
          </Link>
          ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },  
  }
};