import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import rehypePrism from 'rehype-prism-plus';
import { notFound } from 'next/navigation'

import Breadcrumb from '@/component/breadcrumb';
import ViewButton from '@/component/viewButton';
import ThemeSwitch from '@/component/themeswitch';
import { tagColors } from '../tags';
import SocialMediaButton from '@/component/socialMedia';
import ZoomableImage from '@/component/zoomimage';


export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))
  return files.map(file => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

const componentsData = {
  h1: (props) => {return(
    <div>
      <br/>
      <h1 className="text-4xl font-bold mt-2 mb-2" {...props} />
    </div>
  )},
  a: (props) => <a className="text-blue-400 underline hover:text-blue-600" target="_blank"  {...props} />,
  Image: (props) => {
    const { src, alt, description, width, height } = props
    return (
      <div className="flex flex-col items-center justify-center mt-4 mb-4">
        <Image src={src} alt={alt} width={width} height={height}  />
        <em>{description}</em>
      </div>
    );
  },
  Video: (props) => {
    const { src, description, className } = props
    return(
      <div className="flex flex-col items-center justify-center mt-4 mb-4">
        <video
          className={className}
          playsInline
          muted
          loop
          controls
        >
          <source src={src} type="video/mp4" />
        </video>
        {description && <em>{description}</em>}
      </div>
    )
  },
  li: (props) => <li className="ml-6 list-disc leading-relaxed" {...props} />,
  code: ({ children, ...props }) => (
    <code
      className="bg-zinc-900 text-white px-1.5 py-0.5 rounded text-sm outline outline-white"
      {...props}
    >
      {children}
    </code>
    ),
};



export default async function EntryPage({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`)

  if(!fs.existsSync(filePath)){
    notFound()
  }
  const source = fs.readFileSync(filePath, 'utf8');
  
  const data = await compileMDX({
    source: source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {  
        rehypePlugins: [ rehypePrism, ]
      }
    },
    components: componentsData
  })

  const frontmatter = data.frontmatter

  return (
    <div className="w-95/100 sm:w-[856px] mx-auto ">
      <div className="font-mono text-black dark:text-white">
        <div className="flex mt-3 sm:mt-[15vh]">
          <div>
            <div>
              <Breadcrumb currentPage={data.frontmatter.title}/>
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
          
          <div className="ml-auto mt-10">
            <div>
              <ViewButton href={frontmatter.view} />
            </div>
            <div className="hidden sm:mt-2 sm:flex sm:justify-center">
              { frontmatter.github && (
                  <SocialMediaButton href={frontmatter.githubLink} media="github"/>
                )
            }
            </div>
          </div>

        </div>

        <div className="flex justify-center block sm:hidden mt-4">
          { frontmatter.github && (
            <SocialMediaButton href={frontmatter.githubLink} media="github"/>
          )
          }
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

        <ZoomableImage 
          src={frontmatter.image}
          width={1000}
          height={1000}
          alt=""
          className="w-full h-auto rounded-2xl mt-2"
        />
        

        <article className="text-lg">
          {data.content}
        </article>

        { frontmatter.github && (
          <div className="flex justify-center mt-5 mb-20">
            <SocialMediaButton href={frontmatter.githubLink} media="github"/>
          </div>
          )
        }

        <Link href="/" className="flex justify-center underline transition-colors duration-200 ease-in-out hover:text-gray-400 mb-10 mt-10">Return to Homepage!</Link>


      </div>
    </div>
    
  );
}
