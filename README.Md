# Medium Clone

As the name implies, is an ExpressJs API built to be consume by Flutter application in repo "medium_clone_ui" the application is having medium functionalities

## Installation

Clone the repo and run this command to install dependencies

```bash
npm install
```

## API Endpoints

```python
Register Endpoint (Documentation)

   @BaseURL = https://medium-clone-v1-expressjs-api.herokuapp.com

/*  @route     POST api/users/register
    @desc      Register up a user
    @access    Public
 */

Login Endpoint

/*  @route     POST api/users/login
    @desc      Login In a user
    @access    Public
 */

 Delete an Account Endpoint

/*  @route     DELETE api/users/id
    @desc      Delete user account
    @access    Private
 */

  Password account Endpoint

/*  @route     PATCH api/users/id
    @desc      Change user password
    @access    Private
 */

Get a single  user  Endpoint

 /* @route     GET api/users/id
    @desc      Get a single user 
    @access    Private
 */

 CHecking if user email already exits

 /* @route     GET api/users/checkemail/:email
    @desc      CHecking if user email already exits
    @access    Public
 */

  CHecking if username already exits

 /* @route     GET api/users/username/:username
    @desc      Checking if username already exits
    @access    Public
 */

```

## Features
+ User registration
+ User login
+ User change password
+ User delete account
+ Create blog Post
+ Facebook login
+ Google login
+ User Profile Screen

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT]