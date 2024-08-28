import React from 'react'
import SuggestionItem from './suggestion-item'
import { SUGGESTIONS_COMMANDS } from '@/lib/suggestions'


export default function Suggestions() {
  return (
    <div className='w-full overflow-x-auto'>
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
    </div>
  )
}