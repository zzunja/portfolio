import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import matter from 'gray-matter';
import { tagColors } from './tags';
import Breadcrumb from '@/component/breadcrumb';
import SocialMediaButton from '@/component/socialMedia';


export default function Home() {
  const entriesDir = path.join(process.cwd(), 'content')
  const files = fs.readdirSync(entriesDir).filter(file => file.endsWith('.mdx'))

  const post = files.map(file => {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(entriesDir, file)
    const source = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = matter(source)
    
    return{
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags,
      image: frontmatter.image
    }
  })


  return (
    <div className="bg-[#181717]">
      <div className="w-95/100 text-white mx-auto font-mono sm:w-[856px]">
        <div className="mt-3 sm:mt-[20vh]">
          <Breadcrumb currentPage='Home'/>
        </div>
        <div className="flex">
          <div className="mt-2">
            <p className="text-5xl font-bold">Mason McCombs</p>
            <div className="flex mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>
              <p className="text-m">UTSA Cyber Security Student</p>
            </div>
            
            <div className="flex mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              <p className="text-m">Texas</p>
            </div>
          </div>
          <div className="ml-auto my-auto">
            <SocialMediaButton href="https://github.com/zzunja" media="github"/>
            <SocialMediaButton href="https://www.linkedin.com/in/mason-mccombs-a7a05b238" media="linkedin"/>
          </div>


        </div>

        <p className="mt-6 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida dolor vel tellus euismod, vel sollicitudin turpis maximus. Sed velit tortor, rutrum non hendrerit et, sagittis sed felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida vulputate volutpat. Cras eleifend lectus lectus, id tincidunt odio iaculis a. Nam feugiat odio id enim mollis elementum. Curabitur sit amet nisi in ante pharetra eleifend. Donec at diam elit. Curabitur rutrum erat risus. Cras rutrum suscipit volutpat. Mauris elementum ultrices libero nec cursus. Sed nec justo in ligula sodales maximus. Curabitur a magna ac libero posuere lobortis vel congue neque. </p>
        
        

        <div>
          {post.map(({slug, title, description, date, tags, image}) => {

            return (
              <div key={slug} className="outline-4 outline-gray-500 rounded w-full sm:h-45 mb-8">
                  <div className="flex flex-col sm:flex-row p-3">

                    {/* Image */}
                    <div className="w-full sm:w-3/8 sm:order-2 mb-4 sm:mb-0">
                      <Link href={`${slug}`} className="">
                        <Image
                          src={image}
                          alt=""
                          width={1000}
                          height={1000}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </Link>
                    </div>

                    {/* Title, Tags, Date */}
                    <div className="w-full sm:w-5/8 sm:order-1">

                      
                      <div className="flex flex-col sm:flex-row">
                        {/* Tags */}
                        <div className="order-1 sm:order-2 w-full sm:w-3/4 flex flex-wrap mb-2 sm:mb-0">
                          {Object.entries(tags).map(([key], index) => {
                            return(
                              <div key={index} className={`${tagColors[key]} w-fit h-fit rounded-sm px-[4px] py-[3px] mr-3 mb-1 mt-1 `}>
                                <p className='text-xs text-black'>{key}</p>
                              </div>
                            )
                          })}
                        </div>

                        {/* Title and Date */}
                        <div className="order-2 sm:order-1 w-full sm:w-1/4 mb-2 sm:mb-0">
                          <Link href={`${slug}`} className="">
                            <p className="text-bold text-xl">{title}</p>
                          </Link>
                          <p className="text-sm italic text-gray-500">{date}</p>
                        </div>
                        
                      </div>
                      
                      {/* Description */}
                      <p className="mt-1">{description}</p>

                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
