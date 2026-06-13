'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

function Comment_14({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const longComment = comment.length > 130;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;

  return (
    <div>
      <p className='text-sm leading-6'>{displayComment}</p>
      {longComment && (
        <Button
          type='button'
          variant='link'
          className='h-auto p-0 text-muted-foreground'
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
}

export default Comment_14;
