import  Link from 'next/link';
import Image from 'next/image';
import { tagColors } from '@/app/tags';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: Record<string, any>;
  image: string;
}

export default function DisplayPost({
  post,
}: {
  post: Post[],
}) {
  return(
    <div>
      {post.map((postItem: Post) => {
        const { slug, title, description, date, tags, image } = postItem;
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
                <div className="w-full sm:w-6/8 sm:order-1">

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
                    <div className="mr-1 order-2 sm:order-1 w-full sm:w-3/8 mb-2 sm:mb-0">
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
  )
}