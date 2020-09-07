# Medium Clone

As the name implies, is an ExpressJs API built to be consume by Flutter application in repo "medium_clone_flutter" the app is having medium functionality

## Installation

Clone the repo and run this command to install dependencies

```bash
npm install
```

## API Endpoints

```python
Register Endpoint

/*  @route     POST api/users/register
    @desc      Sign up a user
    @access    Public
 */

Login Endpoint

/*  @route     POST api/users/login
    @desc      Sign In a user
    @access    Public
 */

 Delete an Account Endpoint

/*  @route     DELETE api/users/username
    @desc      Delete In a user
    @access    Private
 */

  Password account Endpoint

/*  @route     PATCH api/users/username
    @desc      Change user password
    @access    Private
 */

Get a single  user  Endpoint

 /*  @route     GET api/users/id
    @desc      Get a single user 
    @access    Private
 */

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT]