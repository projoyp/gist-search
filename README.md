# Problem statement
Create an SPA using github gist api with the following functionality

    ## search all public gists of a given user name.
    ## Show last 3 forks for the gist
    ## Show languages used in the gist

# Initial concern:
    ## Are the apis authenticated
    ## Would A single call return all the necessary details

# Planning
Started with a POC to identify the problem statements and below are the findings 

    ## Apis are public
    ## Apis return 30 entries by default. So would be needing pagination.
    ## Apis have a throttle limit. Need to handle that error
    ## To fetch forks we need a separate call. Clubbing them would hamper performance

    ## Since I’m using my office provided laptop 
        ### Github gist api documentation is blocked by our IT department. Used the npm documentation for the same.

        ### npm/yarn is locked with my office’s internal npm artifactory. So i have to delete the package-lock file for the app to be deployed

So with these new findings stated the implementation. 

# Implementation
I have used the default redux create react app template and For the UX took inspiration from github itself.

## Packages used:

    ### Redux for state management 
    ### Octokit and redux thunk for api calls
    ### Octokit for icons
    ### Material ui for designing 

Created a mobile compatible application
Used debounce on the input field so that the api is not called for each key press
User error boundary so that any component related error didn’t breaks the UI
Created separate screens for forks and comments so that performance is not hampered

# Roadmap:
    ## The performance of the application can be optimised using memoisation
    ## UX can be improved using infinite scroll
    ## Welcome screen can be improved
