import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Breadcrumb from '@/component/breadcrumb';
import SocialMediaButton from '@/component/socialMedia';
import ThemeSwitch from '@/component/themeswitch';
import DisplayPost from '@/component/displaypost';


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
      image: frontmatter.image,
      order: frontmatter.order,
    }
  })


  return (
    <div className="w-95/100 text-dark dark:text-white mx-auto font-mono sm:w-[856px] text-lg mb-3 sm:mb-[15vh]">
      <div className="mt-3 sm:mt-[15vh]">
        <Breadcrumb currentPage='Home'/>
      </div>
      <div className="flex">
        <div className="mt-2">
          <p className="text-5xl font-bold">Mason McCombs</p>
          <div className="flex mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 translate-y-[2px]"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>
            <p className="text-xl">UTSA Cyber Security Student</p>
          </div>
          
          <div className="flex mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 translate-y-[3px]"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            <p className="text-xl">Texas</p>
          </div>
          <div className="flex mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(62.3% 0.214 259.815)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 translate-y-[1px]"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 18a3 3 0 1 0-6 0"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="12" cy="13" r="2"/></svg>
            <a href="/resume.pdf" className="text-xl underline text-blue-300">Resume</a>
          </div>
        </div>
        <div className="ml-auto my-auto">
          <SocialMediaButton href="https://github.com/zzunja" media="github"/>
          <SocialMediaButton href="https://www.linkedin.com/in/mason-mccombs-a7a05b238" media="linkedin"/>
          <ThemeSwitch/>
        </div>


      </div>

      <p className="mt-4 mb-6">Hi, I'm Mason McCombs, an undergrad Cyber Security student currently attending UTSA. I have a strong interest in Malware Development and Reverse Engineering. I also enjoy making websites from time to time. Here are a list of projects that I have done.</p>

      <DisplayPost
        post={post}
      />
    </div>
  );
}
