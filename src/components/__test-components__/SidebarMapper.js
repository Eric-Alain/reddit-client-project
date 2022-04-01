//React
import React from 'react'

//3rd party
import Img from 'react-cool-img'

const fakeFetch = {
  children: [
    {
      display_name: 'Damnthatsinteresting',
      icon_img: 'https://b.thumbs.redditmedia.com/b19-jQLBsVc2-EQfPx5WEQkYIL_clR0mhba4-pHT0AA.png',
      display_name_prefixed: 'r/Damnthatsinteresting'
    }
  ]
}

const SidebarMapper = ({ data, handleClick }) => {
  
  return (
    <>
      {data.children.map((subreddit, i) => {
        return (
          <button key={i} onClick={() => handleClick(fakeFetch)}>
            <Img src={subreddit.icon_img} alt='subreddit-img' />
            <span>{subreddit.display_name}</span>
          </button>
        )
      })}
    </>
  )
}

export default SidebarMapper
