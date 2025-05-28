import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation'
import React from 'react'

function SnippetsDetailPage() {
    
    const snippetId = useParams().id;
    const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });


  return (
    <div>SnippetsDetailPage</div>
  )
}

export default SnippetsDetailPage