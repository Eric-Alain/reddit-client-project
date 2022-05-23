#Codecademy challenge solution - Build Your Own Reddit App
==========================================================

##Project description
---------------------

This is my attempt at applying what I've learned about React and Redux in the Codecademy challenge titled "Build Your Own Reddit App" using the Reddit JSON API.

[Here is my solution](https://eric-alain-reddit-client-project.netlify.app).

You also can view the [example project](https://reddit-client.netlify.app/) that they provide in order to compare to my solution.

My solution, in essence, is pretty comparable to the one provided, with the exception of some added features:

- Theme selector. This was simply for fun. Make sure to check out the unicorn theme!
- More consistent image sizing with the option to click on images and have them pop up as modals. I didn't like the way that the Codecademy solution handled image sizing (overly large or inconsistent).
- Loading animation. It just felt nicer to have some kind of visual feedback to signal that the page was fetching results from the API and loading them. 

This solution is also considerably different in the framework that it uses to string everything up. I am partial to Gatsby.js and decided to run my React and Redux solution through Gatsby's framework. If you notice some unfamiliar file structure or syntax, then this is probably the main culprit.

With this app, you are able to: 

- Peruse a set of predefined Reddit posts, if interested, you can visit the post, the author's page or the comments section on Reddit.com
- Click on an image to have it expand as a modal and inspect it
- Load more posts from the same topic if you get to the bottom of the page
- Search using key words and have the new results populate the page
- Search using the list of the 20 most popular subreddits (will always be the top 20 subreddits at the time of page render)
- Change themes if you don't like the current one - to each their own!

##Technologies
--------------

- Reddit JSON API
- React for component-based architecture
- Redux to manage state
- Gatsby for server side rendering
- Github for repository management
- Netlify for hosting and CI/CD workflow to automatically deploy changes from repository master branch
- Bootstrap 5 for responsive design and utility
- Fontawesome 6 for icons
- GreenSock (GSAP) for animations
- React-testing-library (which employs the use of JEST) for testing

##Requirements
--------------

- [x] Write unit tests for your components using Jest
- [x] Write end-to-end tests for your application
- [x] Users can use the application on any device (desktop to mobile)
- [x] Users can use the application on any modern browser
- [x] Users can access your application at a URL
- [x] Users see an initial view of the data when first visiting the app
- [x] Users can search the data using terms
- [x] Users can filter the data based on categories that are predefined
- [x] Users are shown a detailed view (modal or new page/route) when they select an item
- [x] Users are delighted with a cohesive design system
- [x] Users are delighted with animations and transitions
- [x] Users are able to leave an error state
- [x] [Get 90+ scores on Lighthouse](https://pagespeed.web.dev/report?url=https%3A%2F%2Feric-alain-reddit-client-project.netlify.app%2F)
- [x] Get a custom domain name and use it for your application
- [x] Set up a CI/CD workflow to automatically deploy your application when the master branch in the repository changes
- [x] Make your application a progressive web app

##Conclusion
I hope that this solution helps to inspire you to create something great. At the bare minimum, I hope it can help you overcome some hurdles if you are stumped anywhere.

You can check me out [here](https://www.ericalain.ca).
