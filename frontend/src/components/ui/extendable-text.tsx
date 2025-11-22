import { cn } from '../../lib/utils';
import { useState } from 'react';

export default function ExtendableText({value, className}:{value: string, className?: string}) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isReadingMore, setIsReadingMore] = useState(false);

  const onComponentMount = (node: HTMLParagraphElement) => {
    if (!node) return;
    setIsTruncated(node.offsetHeight < node.scrollHeight);
  }

  return (
    <div>
      <p ref={onComponentMount} className={cn(`line-clamp-2 ${className}`, isReadingMore && `line-clamp-none`)}>
        {value}
      </p>
      {isTruncated && (
        <button
          className="mt-3 text-sm leading-6 underline cursor-pointer"
          onClick={() => setIsReadingMore(prev => !prev)}
        >
          {isReadingMore ? "Collapse" : "Read More"}
        </button>
      )}
    </div>
  )
}
