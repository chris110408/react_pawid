this application will be write by typescript and graphql later

build with create react app and use the idea of inject saga and reducer of react-boilerplate

I used a hackathons api server to host the backend rest api. I modifed it to use ES6 feature  and by using the asyncMiddleWare we could  use async await generator
the I create a ADO object and add the functions on its prototype chain instead of use the moogoose schema methods.

make sure you start the api server and start this application by using the following command

 npm run start
 please be aware that the default api server is http://localhost:8080. if you changed the api server port please also change the
 "proxy": "http://localhost:8080" which located at the bottom of  the package.json  file.

all the source code is located at src.
 the app starter is index.js
 the store is in the config folder
 !!!router folder was is a folder which i used for pratice route function. do not need to touch it
 the main route is located at containers/App/App.js
 the authority of the front end route is controllerd by AuthorizedRoute you could use it as following,
 const ConfirmedRoute = withProps({ authority: USER_TYPE_CONFIRMED })(AuthorizedRouter);

 then use the element at the route,
 <ConfirmedRoute
                path="/dashboard"
                component={DashBoardPage}
              />

 the example able only user who has USER_TYPE_CONFIRMED authority could access this route

 the props of elseAuthority and elseComponent is an option. if those option is not empty for example:

 <ConfirmedRoute
               path="/dashboard"
               component={DashBoardPage}
               elseAuthority={USER_TYPE_REG}
               elseComponent={UnconfirmedPage}
             />
that means USER_TYPE_CONFIRMED authority could access DashBoardPage if the user do not have USER_TYPE_CONFIRMED authority but have a lower level authority USER_TYPE_REG
the user could see the page of UnconfirmedPage

the AuthorizedRouter use the Authorized component which is located at components/Authorized. please check the the user authority could use different format please double check file
CheckPermissions and CheckPermissions.tests for how to use it.

all the api request is located in service/api folder

the utils folder has the utils functions such as injectreducer and injectsagas

CONSTANTS folder  has the global constants for example global color style and usertype
 there are 3 usertype for now .USER_TYPE_GUEST USER_TYPE_REG  USER_TYPE_CONFIRMED
 if user signed up he will get USER_TYPE_REG and after he active the link by using  his email he will be granted as USER_TYPE_CONFIRMED

 all email will be send to and recieve at the inbox of   https://mailtrap.io


 the global reducer is composed by two sub reducer,

 routerReducer and user reducer.
 routerReducer is for react-router-redux and user reducer has two part one is userinfo another is messages i am not sure we may no longer need the message in reducer.

 the reducer which only used for onepage should be reject at that page by using injectReducer function. Sign up page is a good example for it.

 the structure  of one page is
page:folder
    -model:subfolder
          --actions:js
          --sagas:js
          --reducers:js
          --selectors:js
    -style:subfolder
          --stylefile:js
    index:js
    ...pages:js

the React utility belts of this projects are
reselect
recompose
styled-components
ramda or lodash fp
redux-sagas
antd












the structure of the app is as following:




