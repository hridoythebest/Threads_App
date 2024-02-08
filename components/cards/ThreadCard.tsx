
import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import { likeThread } from "@/lib/actions/thread.actions";
import Liker from "./Liker";
import Deleter from "./Deleter";


interface Props {
    id: string | null;
    currentUserId: string;
    myUserId?: string;
    parentId: string;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[];
    threadId?: string;
    isComment?:boolean;
    myLiked?:boolean | undefined;
    totalLikes?:number
}


const ThreadCard =  ({
id,
currentUserId,
myUserId,
parentId,
content,
author,
community,
createdAt,
comments,
isComment,
myLiked,
totalLikes
}: Props) => {



    
    return (
        <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link className="relative h-11 w-11" href={`/profile/${author.id}`}>
                            <Image 
                                src={author.image}
                                alt="profile_image"
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>

                        <div className="thread-card_bar" />
                    </div>

                        <div className="flex w-full flex-col">
                        <Link className="w-fit" href={`/profile/${author.id}`}>
                            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                        </Link>

                        <p className="mt-2 text-small-regular text-light-2">{content}</p>

                        <div className={` ${isComment && 'mb-10'} mt-5 flex flex-col gap-3 `}>
                            <div className="flex gap-3.5">
                              
                                {/* <Image  className="cursor-pointer object-contain" src="/assets/heart-gray.svg" alt="heart" width={24} height={24} /> */}
                                
                                {myUserId && id &&
                                <Liker threadId={id} userId={myUserId} liked={myLiked} /> }
                             
                                <Link href={`/thread/${id}`}>
                                <Image className="cursor-pointer object-contain" src="/assets/reply.svg" alt="reply" width={24} height={24} />
                                </Link>

                                <Image className="cursor-pointer object-contain" src="/assets/repost.svg" alt="repost" width={24} height={24} />
                                <Image className="cursor-pointer object-contain" src="/assets/share.svg" alt="share" width={24} height={24} />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                            )}
                        </div>
                     </div>
                  <Deleter threadId={id} />
                </div>

                {/* Delete Thread */}

                
            </div>
            {!isComment && community && (
                    <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                        <p className="text-subtle-medium text-gray-1">
                            {formatDateString(createdAt)}
                          {" "}  - {community.name} Community
                        </p>

                        <Image
                         src={community.image}
                         alt={community.name}
                         width={14}
                         height={14}
                         className="ml-1 rounded-full object-cover"
                          />
                    </Link>
                )}
        </article>
    )
}

export default ThreadCard