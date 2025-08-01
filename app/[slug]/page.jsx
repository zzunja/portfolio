import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';

import Breadcrumb from '@/component/breadcrumb';
import ViewButton from '@/component/viewButton';
import { tagColors } from '../tags';



export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'));
  return files.map(file => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export default async function EntryPage({ params }) {
  const { slug } = await params;
  const source = fs.readFileSync(path.join(process.cwd(), 'content', `${slug}.mdx`), 'utf8');

  const { content: Content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {  
      h1: (props) => <h1 className="text-4xl font-bold mt-2 mb-2" {...props} />,
    }, 
  })


  return (
    <div className="w-95/100 sm:w-[856px]  mx-auto ">
      <div className="font-mono text-white">
        <div className="flex mt-3 sm:mt-[20vh]">
          <div>
            <div>
              <Breadcrumb currentPage={frontmatter.title}/>
            </div>
            <p className="text-5xl font-bold"> 
              {frontmatter.title}
            </p>
            <p className="ml-1 mt-1">
              Mason McCombs
            </p>

            <p className="ml-1 text-sm italic">
              {frontmatter.date}
            </p>
          </div>
          <div className="ml-auto my-auto">
            <ViewButton href={frontmatter.view}/>
          </div>

        </div>

        <div className="flex flex-wrap justify-center mt-2">
          {Object.entries(frontmatter.tags).map(([key], index) => {
            return(
              <div key={index} className={`${tagColors[key]} w-fit h-fit rounded-sm px-[4px] py-[3px] mr-3 mb-1 mt-1 `}>
                <p className='text-xs text-black'>{key}</p>
              </div>
            )
          })}
        </div>

        <Image 
          src={frontmatter.image}
          width={1000}
          height={1000}
          alt=""
          className="w-full h-auto rounded-2xl mt-2"
        />

      </div>
      


      <article className="prose prose-invert">
        {Content}
      </article>
    </div>
    
  );
}