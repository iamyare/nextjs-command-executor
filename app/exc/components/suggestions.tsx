import React from 'react'
import SuggestionItem from './suggestion-item'
import { SUGGESTIONS_COMMANDS } from '@/lib/suggestions'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'


export default function Suggestions() {
  return (

      <ScrollArea className='w-full overflow-visible'>
      <ul className='flex w-max space-x-2'>
        {SUGGESTIONS_COMMANDS.map((suggestion, index) => (
          <SuggestionItem
            title={suggestion.title}
            description={suggestion.description}
            command={suggestion.command}
            os={suggestion.os}
            key={index}
          />
        ))}
      </ul>
      <ScrollBar orientation="horizontal" className=' translate-y-2 pt-1' />
      </ScrollArea>

  )
}