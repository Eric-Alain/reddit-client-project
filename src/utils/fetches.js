import axios from 'axios'
import { unique } from './utils'

export const threadFetch = async str => {
  try {
    //Fetch and use object destructing to collect response
    const { data: res } = await axios.get(encodeURI(`https://www.reddit.com/search.json?q=${str}`))
    const resObj = res.data.children.map(item => {
      return {
        author: item.data.author,
        createdUtc: item.data.created_utc,
        numComments: item.data.num_comments,
        permalink: item.data.permalink,
        previewImage: item.data.preview,
        subredditNamePrefixed: item.data.subreddit_name_prefixed,
        subredditSubscribers: item.data.subreddit_subcribers,
        title: item.data.title,
        url: item.data.url
      }
    })
    return resObj
  } catch (error) {
    console.log(error)
  }
}

export const threadFromSubredditFetch = async str => {
  try {
    //Fetch and use object destructing to collect response
    const { data: res } = await axios.get(encodeURI(`https://www.reddit.com/${str}.json`))
    const resObj = res.data.children.map(item => {
      return {
        author: item.data.author,
        createdUtc: item.data.created_utc,
        numComments: item.data.num_comments,
        permalink: item.data.permalink,
        previewImage: item.data.preview,
        subredditNamePrefixed: item.data.subreddit_name_prefixed,
        subredditSubscribers: item.data.subreddit_subcribers,
        title: item.data.title,
        url: item.data.url
      }
    })
    return resObj
  } catch (error) {
    console.log(error)
  }
}

export const fetchPopularSubredditsList = async () => {
  try {
    //Fetch and use object destructing to collect response
    const { data: res } = await axios.get('https://www.reddit.com/r/popular.json?geo_filter=CA&limit=30')
    //Map all subreddit names to array and filter out duplicates
    let subredditNameArr = unique(res.data.children.map(subreddit => subreddit.data.subreddit_name_prefixed))
    //Set array length to desired length
    subredditNameArr.length = 20
    //Sort array alphabetically
    subredditNameArr.sort()
    //Return array
    return subredditNameArr
  } catch (error) {
    console.log(error)
  }
}
export const fetchSubredditData = (arr, fn1, fn2) => {
  try {
    //Create temporary array
    let subredditDataArr = []
    //Async ensures that we are waiting for our fetch to complete before proceeding
    //For each subreddit name in the array passed to this fn
    arr.forEach(async name => {
      //Fetch from reddit
      await axios.get(`https://www.reddit.com/${name}/about.json?limit=1`).then(res => {
        //Push data object to our temporary array
        subredditDataArr.push({
          name: res.data.data.display_name,
          namePrefixed: res.data.data.display_name_prefixed,
          image: res.data.data.icon_img
        })
        //When the array reaches the desired length, dispatch it to our redux store
        //Not necessary to do it this way, but adds a little more control
        if (subredditDataArr.length === 20) {
          fn1(fn2(subredditDataArr))
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
